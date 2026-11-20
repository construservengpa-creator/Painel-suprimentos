-- =====================================================================
--  CENTRAL DE ACESSOS DO CAPIVARA
--  Projeto Supabase: painel_suprimentos (schema public, tabelas acesso_*)
--
--  Um cadastro só de pessoas para todas as aplicações do Capivara:
--    • quais aplicações cada pessoa usa;
--    • com qual PERFIL em cada aplicação (o perfil é a lista de permissões:
--      o que a pessoa vê, executa, aprova, exclui…);
--    • quais OBRAS ela enxerga em cada aplicação (ou todas);
--    • o login (conta) que ela usa em cada aplicação — a troca de senha,
--      o bloqueio e a criação do login são feitos pela Edge Function
--      "central-acessos" (precisa da chave de serviço de cada projeto).
--
--  A central passa a ser a FONTE DA VERDADE: ao salvar aqui, o acesso é
--  gravado no cadastro próprio de cada aplicação do mesmo projeto:
--    • Suprimentos (Painel)  → public.perfis (admin/supervisor/operador…/Jarvis)
--    • Validador Email       → public.validador_email_acesso
--    • CAP-Refeições         → medicoes.usuarios (perms, perfil, obras, ativo)
--  Aplicações de outros projetos (Notas, Estoque) são sincronizadas pela
--  Edge Function. Mudanças feitas direto dentro de cada app continuam
--  funcionando, mas são sobrescritas na próxima vez que a central salvar
--  aquele usuário naquela aplicação.
--
--  Quem gerencia: administrador do Painel (private.is_admin_only).
--  Pode rodar de novo quando quiser (idempotente).
-- =====================================================================

create schema if not exists private;

-- ---------------------------------------------------------------------
-- 1. Tabelas
-- ---------------------------------------------------------------------
create table if not exists public.acesso_aplicacoes (
  id          text primary key,                 -- suprimentos, refeicoes, notas, estoque, validador-email
  nome        text not null,
  descricao   text,
  url         text,
  projeto     text not null default 'painel',   -- painel | notas | estoque  (de onde vem o login)
  tipo_login  text not null default 'email',    -- email | login (login vira login@dominio)
  dominio_login text,                           -- ex.: rafinfraestrutura.com.br (CAP-Refeições)
  usa_obras   boolean not null default false,   -- a aplicação filtra por obra?
  sincroniza  text not null default 'banco',    -- banco (trigger aqui) | funcao (Edge Function) | manual
  ordem       int not null default 0,
  ativo       boolean not null default true
);

create table if not exists public.acesso_permissoes (
  app_id   text not null references public.acesso_aplicacoes(id) on delete cascade,
  codigo   text not null,
  nome     text not null,
  grupo    text not null default 'Geral',
  ordem    int not null default 0,
  primary key (app_id, codigo)
);

create table if not exists public.acesso_perfis (
  id          bigint generated always as identity primary key,
  app_id      text not null references public.acesso_aplicacoes(id) on delete cascade,
  nome        text not null,
  descricao   text,
  permissoes  text[] not null default '{}',
  todas_obras boolean not null default false,   -- padrão sugerido ao dar este perfil
  ativo       boolean not null default true,
  atualizado_em timestamptz not null default now(),
  unique (app_id, nome)
);

create table if not exists public.acesso_obras (
  id        bigint generated always as identity primary key,
  codigo    text,
  nome      text not null,
  ativa     boolean not null default true,
  criado_em timestamptz not null default now()
);
create unique index if not exists acesso_obras_nome_uk on public.acesso_obras (lower(nome));

-- Como cada aplicação chama a mesma obra (id/código no cadastro dela)
create table if not exists public.acesso_obra_vinculos (
  obra_id  bigint not null references public.acesso_obras(id) on delete cascade,
  app_id   text not null references public.acesso_aplicacoes(id) on delete cascade,
  ref      text not null,
  primary key (obra_id, app_id),
  unique (app_id, ref)
);

create table if not exists public.acesso_usuarios (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  email       text,
  cargo       text,
  telefone    text,
  ativo       boolean not null default true,
  observacao  text,
  criado_em   timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create unique index if not exists acesso_usuarios_email_uk on public.acesso_usuarios (lower(email)) where email is not null;

create table if not exists public.acesso_usuario_apps (
  usuario_id  uuid not null references public.acesso_usuarios(id) on delete cascade,
  app_id      text not null references public.acesso_aplicacoes(id) on delete cascade,
  perfil_id   bigint references public.acesso_perfis(id) on delete set null,
  ativo       boolean not null default true,
  todas_obras boolean not null default false,
  conta_email text,          -- e-mail de entrada naquela aplicação (CAP-Refeições: LOGIN@dominio)
  conta_id    uuid,          -- id do login (auth.users) no projeto da aplicação
  validade    date,          -- acesso expira depois desta data (opcional)
  atualizado_em timestamptz not null default now(),
  atualizado_por uuid,
  primary key (usuario_id, app_id)
);
create index if not exists acesso_usuario_apps_conta_ix on public.acesso_usuario_apps (app_id, conta_id);

create table if not exists public.acesso_usuario_obras (
  usuario_id uuid not null,
  app_id     text not null,
  obra_id    bigint not null references public.acesso_obras(id) on delete cascade,
  primary key (usuario_id, app_id, obra_id),
  foreign key (usuario_id, app_id) references public.acesso_usuario_apps(usuario_id, app_id) on delete cascade
);

create table if not exists public.acesso_log (
  id         bigint generated always as identity primary key,
  em         timestamptz not null default now(),
  por        uuid default auth.uid(),
  por_nome   text,
  usuario_id uuid,
  app_id     text,
  acao       text not null,
  detalhes   jsonb not null default '{}'::jsonb
);
create index if not exists acesso_log_em_ix on public.acesso_log (em desc);

-- ---------------------------------------------------------------------
-- 2. Quem administra a central
-- ---------------------------------------------------------------------
create or replace function private.is_central_admin(uid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select p.is_admin from public.perfis p where p.id = uid), false);
$$;

-- ---------------------------------------------------------------------
-- 3. RLS: só o administrador lê e grava; o registro do histórico é só leitura
-- ---------------------------------------------------------------------
do $$ declare t text; begin
  foreach t in array array['acesso_aplicacoes','acesso_permissoes','acesso_perfis','acesso_obras','acesso_obra_vinculos',
                           'acesso_usuarios','acesso_usuario_apps','acesso_usuario_obras','acesso_log'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "central admin le" on public.%I', t);
    execute format('create policy "central admin le" on public.%I for select to authenticated using (private.is_central_admin((select auth.uid())))', t);
    if t <> 'acesso_log' then
      execute format('drop policy if exists "central admin grava" on public.%I', t);
      execute format('create policy "central admin grava" on public.%I for all to authenticated using (private.is_central_admin((select auth.uid()))) with check (private.is_central_admin((select auth.uid())))', t);
    end if;
  end loop;
end $$;
-- os apps (e a tela inicial) podem listar quais aplicações existem
drop policy if exists "logado le aplicacoes" on public.acesso_aplicacoes;
create policy "logado le aplicacoes" on public.acesso_aplicacoes for select to authenticated using (true);

-- ---------------------------------------------------------------------
-- 4. Acesso efetivo de uma pessoa numa aplicação
-- ---------------------------------------------------------------------
create or replace function private.acesso_efetivo(p_usuario uuid, p_app text) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'app', ua.app_id,
    'ativo', ua.ativo and u.ativo and (ua.validade is null or ua.validade >= current_date) and coalesce(pf.ativo, false),
    'perfil_id', pf.id,
    'perfil', pf.nome,
    'permissoes', to_jsonb(coalesce(pf.permissoes, '{}'::text[])),
    'todas_obras', ua.todas_obras,
    'obras', coalesce((
      select jsonb_agg(jsonb_build_object('id', o.id, 'codigo', o.codigo, 'nome', o.nome, 'ref', v.ref) order by o.nome)
        from public.acesso_usuario_obras uo
        join public.acesso_obras o on o.id = uo.obra_id
        left join public.acesso_obra_vinculos v on v.obra_id = o.id and v.app_id = ua.app_id
       where uo.usuario_id = ua.usuario_id and uo.app_id = ua.app_id), '[]'::jsonb)
  )
  from public.acesso_usuario_apps ua
  join public.acesso_usuarios u on u.id = ua.usuario_id
  left join public.acesso_perfis pf on pf.id = ua.perfil_id
  where ua.usuario_id = p_usuario and ua.app_id = p_app;
$$;

-- Para as aplicações: "o que EU posso nesta aplicação?" (login do mesmo projeto)
create or replace function public.acesso_meu(p_app text) returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select private.acesso_efetivo(ua.usuario_id, ua.app_id)
       from public.acesso_usuario_apps ua
      where ua.app_id = p_app and ua.conta_id = auth.uid()
      limit 1),
    jsonb_build_object('app', p_app, 'ativo', false, 'permissoes', '[]'::jsonb, 'obras', '[]'::jsonb, 'cadastrado', false));
$$;
revoke all on function public.acesso_meu(text) from public, anon;
grant execute on function public.acesso_meu(text) to authenticated;

-- "Posso executar X?" — para usar em políticas RLS das aplicações
create or replace function public.acesso_pode(p_app text, p_permissao text) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((public.acesso_meu(p_app)->>'ativo')::boolean, false)
     and (public.acesso_meu(p_app)->'permissoes') ? p_permissao;
$$;
revoke all on function public.acesso_pode(text, text) from public, anon;
grant execute on function public.acesso_pode(text, text) to authenticated;

-- ---------------------------------------------------------------------
-- 5. Sincronização com o cadastro próprio das aplicações deste projeto
-- ---------------------------------------------------------------------
create or replace function private.acesso_revogar(p_app text, p_conta uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_app = 'suprimentos' then
    update public.perfis set is_admin = false, is_supervisor = false, is_operador = false, is_operador_avancado = false,
      is_convidado = true, jarvis_liberado = false where id = p_conta;
  elsif p_app = 'validador-email' then
    delete from public.validador_email_acesso where user_id = p_conta;
  elsif p_app = 'refeicoes' and to_regclass('medicoes.usuarios') is not null then
    update medicoes.usuarios set data = data || jsonb_build_object('ativo', false, 'perms', jsonb_build_array('acessos.v283')), updated_at = now()
     where id = p_conta;
  end if;
end $$;
revoke all on function private.acesso_revogar(text, uuid) from public, anon, authenticated;

create or replace function private.acesso_sincronizar(p_usuario uuid, p_app text) returns text
language plpgsql security definer set search_path = public as $$
declare
  ua record; u record; ef jsonb; perms text[]; ok boolean;
  v_admin boolean; v_sup boolean; v_opav boolean; v_op boolean; v_conv boolean; v_jarvis boolean;
  refs jsonb; d jsonb;
begin
  if coalesce(current_setting('central.importando', true), '') = '1' then return 'importando'; end if;
  select * into ua from public.acesso_usuario_apps where usuario_id = p_usuario and app_id = p_app;
  if not found or ua.conta_id is null then return 'sem login vinculado'; end if;
  select * into u from public.acesso_usuarios where id = p_usuario;
  ef := private.acesso_efetivo(p_usuario, p_app);
  ok := coalesce((ef->>'ativo')::boolean, false);
  perms := array(select jsonb_array_elements_text(ef->'permissoes'));
  if not ok then perms := '{}'; end if;

  if p_app = 'suprimentos' then
    -- o Painel trabalha com papéis: o papel sai das permissões do perfil
    v_admin  := 'painel.usuarios' = any(perms) or 'painel.importar' = any(perms);
    v_sup    := not v_admin and 'painel.creditos' = any(perms);
    v_opav   := not (v_admin or v_sup) and 'painel.cap' = any(perms);
    v_op     := not (v_admin or v_sup or v_opav) and 'painel.contratos' = any(perms);
    v_conv   := not (v_admin or v_sup or v_opav or v_op);
    v_jarvis := v_admin or 'painel.jarvis' = any(perms);
    insert into public.perfis as p (id, nome, is_admin, is_supervisor, is_operador, is_operador_avancado, is_convidado, jarvis_liberado)
    values (ua.conta_id, u.nome, v_admin, v_sup, v_op, v_opav, v_conv, v_jarvis)
    on conflict (id) do update set nome = excluded.nome, is_admin = excluded.is_admin, is_supervisor = excluded.is_supervisor,
      is_operador = excluded.is_operador, is_operador_avancado = excluded.is_operador_avancado,
      is_convidado = excluded.is_convidado, jarvis_liberado = excluded.jarvis_liberado;
    return 'ok';

  elsif p_app = 'validador-email' then
    if ok and 'validador.usar' = any(perms) then
      insert into public.validador_email_acesso (user_id) values (ua.conta_id) on conflict do nothing;
    else
      delete from public.validador_email_acesso where user_id = ua.conta_id;
    end if;
    return 'ok';

  elsif p_app = 'refeicoes' then
    if to_regclass('medicoes.usuarios') is null then return 'schema medicoes ausente'; end if;
    -- obras: id da obra no CAP-Refeições (vínculo); vazio = todas
    select coalesce(jsonb_agg(o->>'ref') filter (where o->>'ref' is not null), '[]'::jsonb) into refs
      from jsonb_array_elements(ef->'obras') o;
    if ua.todas_obras then refs := '[]'::jsonb; end if;
    d := jsonb_build_object(
      'nome', u.nome,
      'ativo', ok,
      'status', 'aprovado',
      'perfil', coalesce(ef->>'perfil', 'Personalizado'),
      'perfilId', 'central-' || coalesce(ef->>'perfil_id', '0'),
      -- inativo: o app já bloqueia pelo "ativo"; as permissões ficam guardadas para quando voltar
      'perms', to_jsonb(array_append(array(select jsonb_array_elements_text(ef->'permissoes')), 'acessos.v283')),
      'obras', refs,
      'central', true);
    if u.email is not null then d := d || jsonb_build_object('emailContato', lower(u.email)); end if;
    update medicoes.usuarios set data = data || d, updated_at = now() where id = ua.conta_id;
    if not found then
      insert into medicoes.usuarios (id, data) values (ua.conta_id, d || jsonb_build_object(
        'email', lower(coalesce(ua.conta_email, u.email, '')),
        'login', upper(split_part(coalesce(ua.conta_email, u.email, ''), '@', 1)),
        'criadoEm', now()));
    end if;
    return 'ok';
  end if;

  return 'sincronizado pela Edge Function';
end $$;
revoke all on function private.acesso_sincronizar(uuid, text) from public, anon, authenticated;

-- histórico + sincronização automática
create or replace function private.acesso_log_add(p_usuario uuid, p_app text, p_acao text, p_det jsonb) returns void
language sql security definer set search_path = public as $$
  insert into public.acesso_log (por, por_nome, usuario_id, app_id, acao, detalhes)
  values (auth.uid(), (select nome from public.perfis where id = auth.uid()), p_usuario, p_app, p_acao, coalesce(p_det, '{}'::jsonb));
$$;

create or replace function private.tg_acesso_usuario_apps() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'DELETE' then
    -- tirar a aplicação = o login fica sem nenhuma permissão nela
    if old.conta_id is not null then perform private.acesso_revogar(old.app_id, old.conta_id); end if;
    perform private.acesso_log_add(old.usuario_id, old.app_id, 'removeu acesso', jsonb_build_object('perfil_id', old.perfil_id));
    return old;
  end if;
  new.atualizado_em := now();
  new.atualizado_por := auth.uid();
  return new;
end $$;

create or replace function private.tg_acesso_usuario_apps_depois() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if coalesce(current_setting('central.importando', true), '') = '1' then return null; end if;
  if tg_op = 'UPDATE' and old.conta_id is not null and old.conta_id is distinct from new.conta_id then
    perform private.acesso_revogar(old.app_id, old.conta_id);
  end if;
  perform private.acesso_sincronizar(new.usuario_id, new.app_id);
  if tg_op = 'INSERT' then
    perform private.acesso_log_add(new.usuario_id, new.app_id, 'deu acesso',
      jsonb_build_object('perfil_id', new.perfil_id, 'todas_obras', new.todas_obras, 'ativo', new.ativo));
  elsif (old.perfil_id, old.ativo, old.todas_obras, old.validade, old.conta_id)
        is distinct from (new.perfil_id, new.ativo, new.todas_obras, new.validade, new.conta_id) then
    perform private.acesso_log_add(new.usuario_id, new.app_id, 'alterou acesso', jsonb_build_object(
      'antes', jsonb_build_object('perfil_id', old.perfil_id, 'ativo', old.ativo, 'todas_obras', old.todas_obras, 'validade', old.validade, 'conta_id', old.conta_id),
      'depois', jsonb_build_object('perfil_id', new.perfil_id, 'ativo', new.ativo, 'todas_obras', new.todas_obras, 'validade', new.validade, 'conta_id', new.conta_id)));
  end if;
  return null;
end $$;

drop trigger if exists acesso_usuario_apps_antes on public.acesso_usuario_apps;
create trigger acesso_usuario_apps_antes before insert or update on public.acesso_usuario_apps
  for each row execute procedure private.tg_acesso_usuario_apps();
drop trigger if exists acesso_usuario_apps_del on public.acesso_usuario_apps;
create trigger acesso_usuario_apps_del after delete on public.acesso_usuario_apps
  for each row execute procedure private.tg_acesso_usuario_apps();
drop trigger if exists acesso_usuario_apps_depois on public.acesso_usuario_apps;
create trigger acesso_usuario_apps_depois after insert or update on public.acesso_usuario_apps
  for each row execute procedure private.tg_acesso_usuario_apps_depois();

-- obras da pessoa mudaram → sincroniza (uma vez por comando)
create or replace function private.acesso_obras_mudaram(p_pares jsonb) returns void
language plpgsql security definer set search_path = public as $$
declare r record;
begin
  if coalesce(current_setting('central.importando', true), '') = '1' then return; end if;
  for r in select distinct (x->>'usuario_id')::uuid usuario_id, x->>'app_id' app_id from jsonb_array_elements(p_pares) x loop
    if exists (select 1 from public.acesso_usuario_apps where usuario_id = r.usuario_id and app_id = r.app_id) then
      perform private.acesso_sincronizar(r.usuario_id, r.app_id);
      perform private.acesso_log_add(r.usuario_id, r.app_id, 'alterou obras', jsonb_build_object('obras',
        (select coalesce(jsonb_agg(obra_id order by obra_id), '[]'::jsonb) from public.acesso_usuario_obras
          where usuario_id = r.usuario_id and app_id = r.app_id)));
    end if;
  end loop;
end $$;
create or replace function private.tg_acesso_usuario_obras_ins() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform private.acesso_obras_mudaram((select coalesce(jsonb_agg(jsonb_build_object('usuario_id', usuario_id, 'app_id', app_id)), '[]') from novas));
  return null;
end $$;
create or replace function private.tg_acesso_usuario_obras_del() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform private.acesso_obras_mudaram((select coalesce(jsonb_agg(jsonb_build_object('usuario_id', usuario_id, 'app_id', app_id)), '[]') from velhas));
  return null;
end $$;
drop trigger if exists acesso_usuario_obras_ins on public.acesso_usuario_obras;
drop trigger if exists acesso_usuario_obras_del on public.acesso_usuario_obras;
create trigger acesso_usuario_obras_ins after insert on public.acesso_usuario_obras
  referencing new table as novas for each statement execute procedure private.tg_acesso_usuario_obras_ins();
create trigger acesso_usuario_obras_del after delete on public.acesso_usuario_obras
  referencing old table as velhas for each statement execute procedure private.tg_acesso_usuario_obras_del();

-- perfil mudou (permissões/ativo) → vale na hora para todos que têm o perfil
create or replace function private.tg_atualizado_em() returns trigger
language plpgsql as $$
begin
  new.atualizado_em := now();
  return new;
end $$;
create or replace function private.tg_acesso_perfis_depois() returns trigger
language plpgsql security definer set search_path = public as $$
declare r record;
begin
  if coalesce(current_setting('central.importando', true), '') = '1' then return null; end if;
  if tg_op = 'UPDATE' and (old.permissoes, old.ativo, old.nome) is not distinct from (new.permissoes, new.ativo, new.nome) then
    return null;
  end if;
  for r in select usuario_id, app_id from public.acesso_usuario_apps where perfil_id = new.id loop
    perform private.acesso_sincronizar(r.usuario_id, r.app_id);
  end loop;
  perform private.acesso_log_add(null, new.app_id, case when tg_op = 'INSERT' then 'criou perfil' else 'alterou perfil' end,
    jsonb_build_object('perfil_id', new.id, 'perfil', new.nome,
      'incluidas', (select coalesce(jsonb_agg(x), '[]') from unnest(new.permissoes) x where tg_op = 'INSERT' or not x = any(old.permissoes)),
      'retiradas', case when tg_op = 'UPDATE' then (select coalesce(jsonb_agg(x), '[]') from unnest(old.permissoes) x where not x = any(new.permissoes)) else '[]'::jsonb end));
  return null;
end $$;
drop trigger if exists acesso_perfis_antes on public.acesso_perfis;
create trigger acesso_perfis_antes before update on public.acesso_perfis
  for each row execute procedure private.tg_atualizado_em();
drop trigger if exists acesso_perfis_depois on public.acesso_perfis;
create trigger acesso_perfis_depois after insert or update on public.acesso_perfis
  for each row execute procedure private.tg_acesso_perfis_depois();

-- pessoa ativada/desativada ou renomeada → vale em todas as aplicações
create or replace function private.tg_acesso_usuarios() returns trigger
language plpgsql security definer set search_path = public as $$
declare r record;
begin
  if tg_op = 'UPDATE' then
    if (old.ativo, old.nome) is distinct from (new.ativo, new.nome) then
      for r in select app_id from public.acesso_usuario_apps where usuario_id = new.id loop
        perform private.acesso_sincronizar(new.id, r.app_id);
      end loop;
      if old.ativo is distinct from new.ativo then
        perform private.acesso_log_add(new.id, null, case when new.ativo then 'reativou pessoa' else 'desativou pessoa' end, '{}'::jsonb);
      end if;
    end if;
  elsif coalesce(current_setting('central.importando', true), '') <> '1' then
    perform private.acesso_log_add(new.id, null, 'cadastrou pessoa', jsonb_build_object('nome', new.nome, 'email', new.email));
  end if;
  return null;
end $$;
drop trigger if exists acesso_usuarios_tg on public.acesso_usuarios;
create trigger acesso_usuarios_tg before update on public.acesso_usuarios
  for each row execute procedure private.tg_atualizado_em();
drop trigger if exists acesso_usuarios_ins on public.acesso_usuarios;
drop trigger if exists acesso_usuarios_depois on public.acesso_usuarios;
create trigger acesso_usuarios_depois after insert or update on public.acesso_usuarios
  for each row execute procedure private.tg_acesso_usuarios();

-- ---------------------------------------------------------------------
-- 6. Aplicações, permissões e perfis iniciais
-- ---------------------------------------------------------------------
insert into public.acesso_aplicacoes (id, nome, descricao, url, projeto, tipo_login, dominio_login, usa_obras, sincroniza, ordem) values
  ('suprimentos',     'Suprimentos',   'Painel de Compras · Sienge', 'https://construservengpa-creator.github.io/Painel-suprimentos/index.html', 'painel', 'email', null, false, 'banco', 1),
  ('notas',           'Notas',         'Notas Fiscais · Sede RAF',  'https://construservengpa-creator.github.io/ControleNotasFiscais/',         'notas',  'email', null, true,  'funcao', 2),
  ('estoque',         'Estoque',       'Controle de Estoque por Obra', 'https://construservengpa-creator.github.io/almoxarifado/',            'estoque','email', null, true,  'manual', 3),
  ('refeicoes',       'CAP-Refeições', 'Medição de Refeições · BM', 'https://construservengpa-creator.github.io/Painel-suprimentos/medicoes/', 'painel', 'login', 'rafinfraestrutura.com.br', true, 'banco', 4),
  ('validador-email', 'Validador Email', 'Triagem do Outlook',      'https://construservengpa-creator.github.io/Painel-suprimentos/validador-email.html', 'painel', 'email', null, false, 'banco', 5)
on conflict (id) do update set nome = excluded.nome, descricao = excluded.descricao, projeto = excluded.projeto,
  tipo_login = excluded.tipo_login, dominio_login = excluded.dominio_login, usa_obras = excluded.usa_obras,
  sincroniza = excluded.sincroniza, ordem = excluded.ordem;

insert into public.acesso_permissoes (app_id, codigo, nome, grupo, ordem) values
  -- Suprimentos (Painel): o papel no Painel sai destas permissões (ver private.acesso_sincronizar)
  ('suprimentos','painel.suprimentos','Solicitações, pedidos, centros de custo e pedidos sem NF','Consulta',1),
  ('suprimentos','painel.fluxo','Conformidade do fluxo','Consulta',2),
  ('suprimentos','painel.criticos','Insumos críticos (entrega e cotação)','Consulta',3),
  ('suprimentos','painel.cotacoes','Cotação de preços (certame)','Consulta',4),
  ('suprimentos','painel.contratos','Contratos: lista, agenda, aditivos e medições (sem isto a pessoa é Convidado)','Operação',5),
  ('suprimentos','painel.cap','Controle de CAP — lançar entregas e devoluções (Operador avançado)','Operação',6),
  ('suprimentos','painel.creditos','Crédito entre obras, CAP e Financeiro (Supervisor)','Gestão',7),
  ('suprimentos','painel.jarvis','Jarvis (assistente)','Gestão',8),
  ('suprimentos','painel.importar','Importar e publicar o relatório do Sienge (Administrador)','Administração',9),
  ('suprimentos','painel.usuarios','Gerir usuários e a Central de acessos (Administrador)','Administração',10),
  -- Validador Email
  ('validador-email','validador.usar','Usar a triagem do Outlook (cada um vê só o próprio e-mail)','Acesso',1),
  -- Notas (projeto Controle_Documentos-Fiscais): papel e coluna do quadro
  ('notas','notas.admin','Administrador do Notas','Papel',1),
  ('notas','notas.supervisor','Supervisor (vê e distribui todas as notas)','Papel',2),
  ('notas','notas.coluna.pendencias','Coluna Pendências','Coluna do quadro',3),
  ('notas','notas.coluna.lancamento','Coluna Lançamento','Coluna do quadro',4),
  ('notas','notas.coluna.financeiro_cx','Coluna Financeiro / Caixa','Coluna do quadro',5),
  ('notas','notas.validador','Validador de NF (homologa notas das obras liberadas)','Validação',6),
  -- Estoque (projeto próprio — integração a configurar)
  ('estoque','estoque.ver','Consultar saldo por obra','Consulta',1),
  ('estoque','estoque.entrada','Registrar entradas','Movimentação',2),
  ('estoque','estoque.saida','Registrar saídas e despachos','Movimentação',3),
  ('estoque','estoque.contagem','Contagem de inventário','Inventário',4),
  ('estoque','estoque.aprovar','Aprovar movimentações','Aprovação',5),
  ('estoque','estoque.admin','Administrar cadastros e usuários','Administração',6)
on conflict (app_id, codigo) do update set nome = excluded.nome, grupo = excluded.grupo, ordem = excluded.ordem;

-- CAP-Refeições: o mesmo catálogo de permissões do app (const PERMS em medicoes/app-*.js)
insert into public.acesso_permissoes (app_id, codigo, nome, grupo, ordem)
select 'refeicoes', x.c, x.n, x.g, x.o from (values
  ('rest.registrar','Registrar refeições (scanner)','Restaurante',1),
  ('rest.sobras','Registrar sobras de refeições','Restaurante',2),
  ('rest.estornar','Estornar registro do dia (com justificativa)','Restaurante',3),
  ('rest.data_manual','Registrar refeição com data manual (retroativa)','Restaurante',4),
  ('rest.retroativo','Registros retroativos de vários colaboradores (exige “Registrar refeições”)','Restaurante',5),
  ('rest.validar','Validar BM (assinatura eletrônica do restaurante)','Restaurante',6),
  ('sup.registros','Acessar “Registros” (registros e sobras da semana)','Administrativo',10),
  ('sup.boletins','Acessar “Boletins emitidos”','Administrativo',11),
  ('sup.bm','Emitir, fechar, imprimir e assinar BM','Administrativo',12),
  ('sup.nf','Informar NF e Nº do título e anexar BM assinado','Administrativo',13),
  ('bm.rem_ass','Remover assinatura do BM (com justificativa)','Administrativo',14),
  ('sup.fechar','Fechar refeição sem incluir em BM (com justificativa)','Administrativo',15),
  ('sup.fechamento','Validar o fechamento do dia','Administrativo',16),
  ('fotos.ver','Ver fotos do rosto nos registros','Administrativo',17),
  ('ana.ver','Analítico (painel de gráficos)','Relatórios',20),
  ('rel.registros','Relatório de Registros','Relatórios',21),
  ('rel.financeiro','Relatório Financeiro','Relatórios',22),
  ('rel.colaboradores','Relatório de Colaboradores','Relatórios',23),
  ('aud.ver','Auditoria: Movimentações','Auditoria',30),
  ('aud.arquivos','Auditoria: Arquivos compactados','Auditoria',31),
  ('aud.usuarios','Auditoria: Registro de usuários','Auditoria',32),
  ('fotos.baixar','Baixar arquivos compactados de fotos','Auditoria',33),
  ('del.bm','Excluir boletim de medição','Exclusões',40),
  ('del.sobras','Excluir sobras informadas','Exclusões',41),
  ('del.registros','Excluir registro de refeição (com justificativa)','Exclusões',42),
  ('del.empresas','Excluir empresas','Exclusões',43),
  ('del.obras','Excluir obras','Exclusões',44),
  ('cfg.contratos','Modalidades: contratos e vínculos das obras','Configurações',50),
  ('cfg.usuarios','Cadastrar usuários e permissões (dentro do app)','Configurações',51),
  ('cfg.colab','Cadastrar colaboradores','Configurações',52),
  ('cfg.empresas','Cadastrar empresas e logotipos','Configurações',53),
  ('cfg.obras','Cadastrar obras','Configurações',54),
  ('cfg.precos','Alterar preços','Configurações',55),
  ('cfg.contratada','Cadastrar contratadas (restaurantes)','Configurações',56),
  ('cfg.horarios','Horário limite de registro','Configurações',57),
  ('lgpd.gerir','Gerir a privacidade (LGPD)','Privacidade',60),
  ('jogo.jogar','Jogo da Capivara','Jogo',70)
) x(c, n, g, o)
on conflict (app_id, codigo) do update set nome = excluded.nome, grupo = excluded.grupo, ordem = excluded.ordem;

-- perfis iniciais (não sobrescreve perfis já ajustados)
insert into public.acesso_perfis (app_id, nome, descricao, permissoes, todas_obras) values
  ('suprimentos','Administrador','Tudo, inclusive importar o relatório e gerir acessos',
    array['painel.suprimentos','painel.fluxo','painel.criticos','painel.cotacoes','painel.contratos','painel.cap','painel.creditos','painel.jarvis','painel.importar','painel.usuarios'], true),
  ('suprimentos','Supervisor','Gestão: crédito entre obras, CAP e financeiro',
    array['painel.suprimentos','painel.fluxo','painel.criticos','painel.cotacoes','painel.contratos','painel.cap','painel.creditos','painel.jarvis'], true),
  ('suprimentos','Operador avançado','Operação + lançamentos de CAP',
    array['painel.suprimentos','painel.fluxo','painel.criticos','painel.cotacoes','painel.contratos','painel.cap'], true),
  ('suprimentos','Operador','Consulta + contratos',
    array['painel.suprimentos','painel.fluxo','painel.criticos','painel.cotacoes','painel.contratos'], true),
  ('suprimentos','Convidado','Só as abas abertas',
    array['painel.suprimentos','painel.fluxo','painel.criticos','painel.cotacoes'], true),
  ('validador-email','Usuário','Usa a triagem do próprio Outlook', array['validador.usar'], true),
  ('notas','Administrador','Administrador do Notas', array['notas.admin','notas.validador'], true),
  ('notas','Supervisor','Supervisor do Notas', array['notas.supervisor'], true),
  ('notas','Operador · Pendências','Quadro: coluna Pendências', array['notas.coluna.pendencias'], true),
  ('notas','Operador · Lançamento','Quadro: coluna Lançamento', array['notas.coluna.lancamento'], true),
  ('notas','Operador · Financeiro/Caixa','Quadro: coluna Financeiro/Caixa', array['notas.coluna.financeiro_cx'], true),
  ('notas','Validador de obra','Homologa as notas das obras liberadas', array['notas.validador'], false),
  ('estoque','Administrador','Tudo', array['estoque.ver','estoque.entrada','estoque.saida','estoque.contagem','estoque.aprovar','estoque.admin'], true),
  ('estoque','Almoxarife','Movimenta e conta o estoque da obra', array['estoque.ver','estoque.entrada','estoque.saida','estoque.contagem'], false),
  ('estoque','Aprovador','Aprova movimentações', array['estoque.ver','estoque.aprovar'], false),
  ('estoque','Consulta','Só consulta', array['estoque.ver'], false)
on conflict (app_id, nome) do nothing;

-- perfis do CAP-Refeições: copiados do próprio app (medicoes.perfis)
do $$ begin
  if to_regclass('medicoes.perfis') is not null then
    insert into public.acesso_perfis (app_id, nome, permissoes, todas_obras)
    select 'refeicoes', p.data->>'nome',
           array(select x from jsonb_array_elements_text(coalesce(p.data->'perms','[]'::jsonb)) x where x <> 'acessos.v283'),
           (p.data->>'nome') = 'Administrador'
      from medicoes.perfis p where coalesce(p.data->>'nome','') <> ''
    on conflict (app_id, nome) do nothing;
  end if;
end $$;

-- ---------------------------------------------------------------------
-- 7. Importar quem já usa as aplicações deste projeto (Painel, Validador, CAP-Refeições)
--    Junta a mesma pessoa pelo e-mail. Não muda nada nos apps: só preenche a central.
--    Notas e Estoque entram pela Edge Function (botão "Importar" na central).
-- ---------------------------------------------------------------------
create or replace function public.acesso_importar_existentes() returns jsonb
language plpgsql security definer set search_path = public as $$
declare r record; v_uid uuid; v_pf bigint; n_p int := 0; n_r int := 0; n_o int := 0; v_email text; v_obra bigint;
begin
  if not private.is_central_admin(auth.uid()) and auth.uid() is not null then
    raise exception 'Só o administrador do Painel pode importar.';
  end if;
  -- os triggers de sincronização não devem regravar os apps durante a importação
  perform set_config('central.importando', '1', true);

  -- Painel (public.perfis + login)
  for r in select p.*, lower(a.email) email from public.perfis p join auth.users a on a.id = p.id loop
    insert into public.acesso_usuarios (nome, email) values (coalesce(nullif(btrim(r.nome),''), r.email), r.email)
      on conflict (lower(email)) where email is not null do update set nome = public.acesso_usuarios.nome
      returning id into v_uid;
    select id into v_pf from public.acesso_perfis where app_id = 'suprimentos' and nome =
      case when r.is_admin then 'Administrador' when r.is_supervisor then 'Supervisor'
           when r.is_operador_avancado then 'Operador avançado' when r.is_operador then 'Operador' else 'Convidado' end;
    insert into public.acesso_usuario_apps (usuario_id, app_id, perfil_id, todas_obras, conta_email, conta_id)
      values (v_uid, 'suprimentos', v_pf, true, r.email, r.id)
      on conflict (usuario_id, app_id) do nothing;
    if r.jarvis_liberado and not r.is_admin and not exists (select 1 from public.acesso_perfis where id = v_pf and 'painel.jarvis' = any(permissoes)) then
      -- quem tinha Jarvis sem ser gestor: perfil "<papel> + Jarvis"
      insert into public.acesso_perfis (app_id, nome, descricao, permissoes, todas_obras)
        select app_id, nome || ' + Jarvis', 'Criado na importação', array_append(permissoes, 'painel.jarvis'), true
          from public.acesso_perfis where id = v_pf
        on conflict (app_id, nome) do nothing;
      update public.acesso_usuario_apps set perfil_id = (select p2.id from public.acesso_perfis p2, public.acesso_perfis p1
          where p1.id = v_pf and p2.app_id = 'suprimentos' and p2.nome = p1.nome || ' + Jarvis')
        where usuario_id = v_uid and app_id = 'suprimentos';
    elsif not r.jarvis_liberado and not r.is_admin and exists (select 1 from public.acesso_perfis where id = v_pf and 'painel.jarvis' = any(permissoes)) then
      -- gestor sem Jarvis hoje: perfil "<papel> sem Jarvis" (ninguém ganha nem perde acesso na importação)
      insert into public.acesso_perfis (app_id, nome, descricao, permissoes, todas_obras)
        select app_id, nome || ' sem Jarvis', 'Criado na importação', array_remove(permissoes, 'painel.jarvis'), true
          from public.acesso_perfis where id = v_pf
        on conflict (app_id, nome) do nothing;
      update public.acesso_usuario_apps set perfil_id = (select p2.id from public.acesso_perfis p2, public.acesso_perfis p1
          where p1.id = v_pf and p2.app_id = 'suprimentos' and p2.nome = p1.nome || ' sem Jarvis')
        where usuario_id = v_uid and app_id = 'suprimentos';
    end if;
    n_p := n_p + 1;
  end loop;

  -- Validador Email
  insert into public.acesso_usuario_apps (usuario_id, app_id, perfil_id, todas_obras, conta_email, conta_id)
  select ua.usuario_id, 'validador-email', (select id from public.acesso_perfis where app_id = 'validador-email' and nome = 'Usuário'),
         true, ua.conta_email, v.user_id
    from public.validador_email_acesso v
    join public.acesso_usuario_apps ua on ua.app_id = 'suprimentos' and ua.conta_id = v.user_id
  on conflict (usuario_id, app_id) do nothing;

  -- CAP-Refeições
  if to_regclass('medicoes.usuarios') is not null then
    -- obras do app viram obras da central (pelo nome) com vínculo
    for r in select id, data from medicoes.obras loop
      insert into public.acesso_obras (nome) values (btrim(r.data->>'nome'))
        on conflict (lower(nome)) do update set nome = public.acesso_obras.nome returning id into v_obra;
      insert into public.acesso_obra_vinculos (obra_id, app_id, ref) values (v_obra, 'refeicoes', r.id) on conflict do nothing;
      n_o := n_o + 1;
    end loop;

    for r in select u.id, u.data, lower(a.email) login_email from medicoes.usuarios u join auth.users a on a.id = u.id loop
      v_email := lower(nullif(btrim(coalesce(r.data->>'emailContato', r.data->>'email', '')), ''));
      if v_email is null or v_email like '%@rafinfraestrutura.com.br' then v_email := null; end if;
      v_uid := null;
      if v_email is not null then select id into v_uid from public.acesso_usuarios where lower(email) = v_email; end if;
      if v_uid is null then select usuario_id into v_uid from public.acesso_usuario_apps where conta_id = r.id limit 1; end if;
      if v_uid is null then
        insert into public.acesso_usuarios (nome, email, ativo) values (coalesce(r.data->>'nome', r.login_email), v_email,
          coalesce((r.data->>'ativo')::boolean, true)) returning id into v_uid;
      end if;
      -- perfil do app: o mesmo nome; se a pessoa tem permissões fora do perfil, vira "Personalizado · Nome"
      select id into v_pf from public.acesso_perfis where app_id = 'refeicoes' and nome = r.data->>'perfil'
        and permissoes @> array(select x from jsonb_array_elements_text(coalesce(r.data->'perms','[]')) x where x <> 'acessos.v283')
        and permissoes <@ array(select x from jsonb_array_elements_text(coalesce(r.data->'perms','[]')) x);
      if v_pf is null then
        insert into public.acesso_perfis (app_id, nome, descricao, permissoes)
        values ('refeicoes', 'Personalizado · ' || coalesce(r.data->>'nome', r.login_email), 'Criado na importação (permissões individuais)',
                array(select x from jsonb_array_elements_text(coalesce(r.data->'perms','[]')) x where x <> 'acessos.v283'))
        on conflict (app_id, nome) do update set descricao = excluded.descricao returning id into v_pf;
      end if;
      insert into public.acesso_usuario_apps (usuario_id, app_id, perfil_id, ativo, todas_obras, conta_email, conta_id)
        values (v_uid, 'refeicoes', v_pf, coalesce((r.data->>'ativo')::boolean, true) and coalesce(r.data->>'status','aprovado') = 'aprovado',
                jsonb_array_length(coalesce(r.data->'obras','[]')) = 0, r.login_email, r.id)
        on conflict (usuario_id, app_id) do nothing;
      insert into public.acesso_usuario_obras (usuario_id, app_id, obra_id)
        select v_uid, 'refeicoes', v.obra_id from jsonb_array_elements_text(coalesce(r.data->'obras','[]')) o
          join public.acesso_obra_vinculos v on v.app_id = 'refeicoes' and v.ref = o
        on conflict do nothing;
      n_r := n_r + 1;
    end loop;
  end if;

  perform set_config('central.importando', '', true);
  perform private.acesso_log_add(null, null, 'importou usuários existentes',
    jsonb_build_object('painel', n_p, 'refeicoes', n_r, 'obras', n_o));
  return jsonb_build_object('painel', n_p, 'refeicoes', n_r, 'obras', n_o);
end $$;
revoke all on function public.acesso_importar_existentes() from public, anon;
grant execute on function public.acesso_importar_existentes() to authenticated;

-- sincronizar de novo à mão (botão "Reaplicar" na central)
create or replace function public.acesso_reaplicar(p_usuario uuid, p_app text) returns text
language plpgsql security definer set search_path = public as $$
begin
  if not private.is_central_admin(auth.uid()) and auth.uid() is not null then raise exception 'Sem permissão.'; end if;
  return private.acesso_sincronizar(p_usuario, p_app);
end $$;
revoke all on function public.acesso_reaplicar(uuid, text) from public, anon;
grant execute on function public.acesso_reaplicar(uuid, text) to authenticated;

-- Para a Edge Function central-acessos (chave de serviço): acesso efetivo de qualquer pessoa
create or replace function public.acesso_efetivo_admin(p_usuario uuid, p_app text) returns jsonb
language sql stable security definer set search_path = public as $$
  select private.acesso_efetivo(p_usuario, p_app);
$$;
revoke all on function public.acesso_efetivo_admin(uuid, text) from public, anon, authenticated;
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function public.acesso_efetivo_admin(uuid, text) to service_role;
    grant execute on function public.acesso_reaplicar(uuid, text) to service_role;
    grant execute on function public.acesso_importar_existentes() to service_role;
  end if;
end $$;
