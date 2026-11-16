-- =====================================================================
--  SISMED — funções da migração do app antigo (usadas por medicoes/migrar.html)
--  Já aplicado no projeto painel_suprimentos (16/11/2026). Rodar DEPOIS de sismed-painel-suprimentos.sql.
--  Só o administrador do Medições consegue chamar.
-- =====================================================================

-- auditoria: durante a migração, mantém usuário / IP / data originais
create or replace function medicoes.auditoria_before_insert() returns trigger
language plpgsql security definer set search_path = medicoes as $$
declare h json;
begin
  if coalesce(current_setting('sismed.migrando', true), '') = '1' then return new; end if;
  begin h := current_setting('request.headers', true)::json; exception when others then h := null; end;
  new.usuario_id := auth.uid();
  new.ip := nullif(trim(split_part(coalesce(h->>'x-forwarded-for', h->>'cf-connecting-ip', ''), ',', 1)), '');
  new.user_agent := left(h->>'user-agent', 200);
  new.created_at := now();
  return new;
end $$;

-- cria a conta de um usuário do app antigo com o MESMO id (assinaturas e históricos continuam batendo)
create or replace function medicoes.migrar_usuario(p_id uuid, p_email text, p_nome text, p_login text, p_senha text)
returns text language plpgsql security definer set search_path = medicoes, extensions, auth as $$
declare v_email text := lower(trim(p_email));
begin
  if not medicoes.is_admin() then raise exception 'Só o administrador do Medições pode migrar'; end if;
  if exists (select 1 from auth.users where id = p_id) then return 'existe'; end if;
  if v_email = '' or exists (select 1 from auth.users where lower(email) = v_email) then return 'email_em_uso'; end if;
  if char_length(coalesce(p_senha,'')) < 8 then raise exception 'Senha provisória curta demais'; end if;
  perform set_config('sismed.admin_create', '1', true);
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
                          confirmation_token, recovery_token, email_change_token_new, email_change)
  values ('00000000-0000-0000-0000-000000000000', p_id, 'authenticated', 'authenticated', v_email,
          crypt(p_senha, gen_salt('bf')), now(),
          '{"provider":"email","providers":["email"]}'::jsonb,
          jsonb_build_object('nome', p_nome, 'login', upper(coalesce(p_login,'')), 'app', 'medicoes', 'migrado', true), now(), now(), '', '', '', '');
  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), p_id, p_id::text,
          jsonb_build_object('sub', p_id::text, 'email', v_email, 'email_verified', true),
          'email', now(), now(), now());
  perform set_config('sismed.admin_create', '', true);
  return 'criado';
end $$;

-- grava um lote de linhas copiadas: colunas que não existem aqui são ignoradas; as que faltam recebem o padrão
--   cadastros e movimento: insere ou atualiza (rodar de novo não duplica)
--   usuarios: só de quem tem conta aqui; não sobrescreve quem já usava o Medições novo
--   históricos (auditoria etc.): só acrescenta
create or replace function medicoes.migrar_lote(p_tabela text, p_rows jsonb)
returns integer language plpgsql security definer set search_path = medicoes as $$
declare cols text; sel text; pk text; upd text; n integer; ident boolean; extra text := '';
begin
  if not medicoes.is_admin() then raise exception 'Só o administrador do Medições pode migrar'; end if;
  if p_tabela not in ('perfis','empresas','obras','colaboradores','precos','contratos','contratadas','registros','sobras','bms',
                      'config','usuarios','auditoria','auditoria_arquivos','notificacoes','mensagens','sessoes','fotos_arquivos','jogo_pontos') then
    raise exception 'Tabela % não pode ser migrada', p_tabela;
  end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) = 0 then return 0; end if;
  select string_agg(quote_ident(column_name), ',' order by ordinal_position),
         string_agg(case when column_default is not null and is_identity <> 'YES'
                         then format('coalesce(r.%1$s, %2$s)', quote_ident(column_name), column_default)
                         else format('r.%s', quote_ident(column_name)) end, ',' order by ordinal_position),
         bool_or(is_identity = 'YES')
    into cols, sel, ident
    from information_schema.columns
   where table_schema = 'medicoes' and table_name = p_tabela and is_generated <> 'ALWAYS';
  select string_agg(quote_ident(a.attname), ',') into pk
    from pg_index i join pg_attribute a on a.attrelid = i.indrelid and a.attnum = any(i.indkey)
   where i.indrelid = ('medicoes.' || p_tabela)::regclass and i.indisprimary;
  select string_agg(format('%1$s = excluded.%1$s', quote_ident(column_name)), ',')
    into upd
    from information_schema.columns
   where table_schema = 'medicoes' and table_name = p_tabela and is_generated <> 'ALWAYS'
     and column_name not in (select a.attname from pg_index i join pg_attribute a on a.attrelid = i.indrelid and a.attnum = any(i.indkey)
                              where i.indrelid = ('medicoes.' || p_tabela)::regclass and i.indisprimary);
  if p_tabela = 'jogo_pontos' then extra := 'where exists (select 1 from auth.users u where u.id = r.usuario_id)'; end if;
  perform set_config('sismed.migrando', '1', true);
  if p_tabela = 'usuarios' then
    execute format('insert into medicoes.usuarios as t (%s) select %s from jsonb_populate_recordset(null::medicoes.usuarios, $1) r
                    where exists (select 1 from auth.users u where u.id = r.id)
                    on conflict (id) do update set %s
                    where exists (select 1 from auth.users u where u.id = t.id and u.raw_user_meta_data->>''migrado'' = ''true'')',
                   cols, sel, upd) using p_rows;
  elsif p_tabela in ('auditoria','auditoria_arquivos','mensagens','notificacoes','jogo_pontos') then
    execute format('insert into medicoes.%I (%s) %s select %s from jsonb_populate_recordset(null::medicoes.%I, $1) r %s on conflict do nothing',
                   p_tabela, cols, case when ident then 'overriding system value' else '' end, sel, p_tabela, extra) using p_rows;
  else
    execute format('insert into medicoes.%I (%s) select %s from jsonb_populate_recordset(null::medicoes.%I, $1) r on conflict (%s) do update set %s',
                   p_tabela, cols, sel, p_tabela, pk, upd) using p_rows;
  end if;
  get diagnostics n = row_count;
  perform set_config('sismed.migrando', '', true);
  return n;
end $$;

revoke execute on function medicoes.migrar_usuario(uuid, text, text, text, text) from public, anon, authenticated;
revoke execute on function medicoes.migrar_lote(text, jsonb) from public, anon, authenticated;
grant execute on function medicoes.migrar_usuario(uuid, text, text, text, text) to authenticated;
grant execute on function medicoes.migrar_lote(text, jsonb) to authenticated;

-- arquivos: o administrador do Medições pode gravar e substituir anexos e fotos (inclusive os .zip)
drop policy if exists medicoes_admin_insert on storage.objects;
create policy medicoes_admin_insert on storage.objects for insert to authenticated
  with check (bucket_id in ('anexos','fotos') and medicoes.is_admin());
drop policy if exists medicoes_admin_update on storage.objects;
create policy medicoes_admin_update on storage.objects for update to authenticated
  using (bucket_id in ('anexos','fotos') and medicoes.is_admin())
  with check (bucket_id in ('anexos','fotos') and medicoes.is_admin());
drop policy if exists medicoes_admin_select on storage.objects;
create policy medicoes_admin_select on storage.objects for select to authenticated
  using (bucket_id in ('anexos','fotos') and medicoes.is_admin());

-- =====================================================================
--  Troca de senha obrigatória (16/11/2026) — já aplicado no projeto
--  Marca raw_user_meta_data.trocar_senha = true: contas migradas, contas criadas pelo
--  administrador e senhas redefinidas pelo administrador. O app abre a troca de senha
--  obrigatória ao entrar; quando a pessoa troca a própria senha, a marca sai (gatilho).
--  As versões novas de admin_set_password, admin_create_user e migrar_usuario estão no
--  projeto (migração "medicoes_troca_senha_obrigatoria").
-- =====================================================================
create or replace function medicoes.senha_trocada() returns trigger
language plpgsql security definer set search_path = medicoes as $$
begin
  if new.encrypted_password is distinct from old.encrypted_password
     and coalesce(current_setting('sismed.senha_admin', true), '') <> '1'
     and coalesce(new.raw_user_meta_data, '{}'::jsonb) ? 'trocar_senha' then
    new.raw_user_meta_data := new.raw_user_meta_data - 'trocar_senha';
  end if;
  return new;
end $$;
revoke all on function medicoes.senha_trocada() from public, anon, authenticated;
drop trigger if exists medicoes_senha_trocada on auth.users;
create trigger medicoes_senha_trocada before update on auth.users
  for each row execute procedure medicoes.senha_trocada();
