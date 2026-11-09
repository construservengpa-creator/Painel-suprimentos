-- =====================================================================
--  SISMED — Medição de Refeições — banco de dados COMPLETO (Supabase)
--  Reconstruído a partir do app v3.1.1 (app-3.1.1.js), em 09/11/2026.
--
--  Substitui o schema.sql antigo (v1.0), que não tinha tudo o que o app usa.
--  Rodar o arquivo inteiro no SQL Editor de um projeto NOVO (ou via migração).
--  Pode ser rodado de novo sem estragar nada (idempotente).
--
--  Antes de usar:
--   • Authentication › Providers › Email: desligue "Confirm email".
--   • O primeiro usuário criado pela tela "Criar administrador" vira Administrador.
--
--  Atenção: as regras de segurança e as funções abaixo foram escritas a partir
--  do que o app espera — não são cópia do banco original. Teste antes de usar
--  com dados reais (ver banco/LEIA-ME.md).
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------
-- 1. Tabelas de dados (modelo "documento": id + data jsonb)
-- ---------------------------------------------------------------------
create table if not exists public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.perfis        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.empresas      (id text primary key, data jsonb not null, updated_at timestamptz not null default now());  -- empresas e terceirizadas (data.tipo='terceirizada')
create table if not exists public.obras         (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.colaboradores (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.precos        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.contratos     (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.contratadas   (id text primary key, data jsonb not null, updated_at timestamptz not null default now());  -- restaurantes
create table if not exists public.registros (
  id text primary key,
  data jsonb not null,
  bm_id text generated always as (nullif(data->>'bmId','')) stored,
  updated_at timestamptz not null default now()
);
create table if not exists public.sobras        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.bms           (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
-- config: 'contratada', 'horarios', 'lgpd' e um 'fech:AAAA-MM-DD[|obra|contrato]' por dia validado no Fechamento
create table if not exists public.config        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());

create table if not exists public.auditoria (
  id text primary key,
  data jsonb not null,
  usuario_id uuid,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);
-- trilha antiga compactada em CSV (a cada 3.000 eventos)
create table if not exists public.auditoria_arquivos (
  id bigint generated always as identity primary key,
  de timestamptz,
  ate timestamptz,
  qtd integer not null default 0,
  csv text not null,
  criado_em timestamptz not null default now()
);

-- avisos do sistema e mensagens entre usuários
create table if not exists public.notificacoes (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);
create table if not exists public.mensagens (
  id text primary key,
  de uuid not null default auth.uid(),
  para uuid not null,
  texto text not null check (char_length(texto) between 1 and 1000),
  created_at timestamptz not null default now()
);
-- quem está online / tempo logado (Auditoria › Registro de usuários)
create table if not exists public.sessoes (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
-- arquivos .zip de fotos por dia (Auditoria › Arquivos compactados › Fotos)
create table if not exists public.fotos_arquivos (
  dia date primary key,
  arquivo text not null,
  qtd integer not null default 0,
  bytes bigint not null default 0,
  atualizado_em timestamptz not null default now()
);
-- Jogo da Capivara: recorde por usuário
create table if not exists public.jogo_pontos (
  usuario_id uuid primary key references auth.users(id) on delete cascade,
  nome text not null default '',
  recorde integer not null default 0,
  partidas integer not null default 0,
  refeicoes bigint not null default 0,
  recorde_em timestamptz,
  ultima_em timestamptz
);

create index if not exists registros_data_idx    on public.registros ((data->>'data'));
create index if not exists registros_emp_idx     on public.registros ((data->>'empresaId'));
create index if not exists registros_bm_idx      on public.registros (bm_id);
create index if not exists colab_qr_idx          on public.colaboradores (lower(data->>'qr'));
create index if not exists usuarios_login_idx    on public.usuarios (upper(data->>'login'));
create index if not exists auditoria_created_idx on public.auditoria (created_at desc);
create index if not exists auditoria_user_idx    on public.auditoria (usuario_id);
create index if not exists notificacoes_cr_idx   on public.notificacoes (created_at desc);
create index if not exists mensagens_cr_idx      on public.mensagens (created_at);
create index if not exists sessoes_ultimo_idx    on public.sessoes ((data->>'ultimo'));

-- updated_at automático
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
do $$ declare t text; begin
  foreach t in array array['usuarios','perfis','empresas','obras','colaboradores','precos','contratos','contratadas',
                           'registros','sobras','bms','config','sessoes'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute procedure public.set_updated_at()', t);
  end loop; end $$;

-- ---------------------------------------------------------------------
-- 2. Permissões — espelham a função can() do app
--    • Administrador (perfil 'Administrador' ou tipo 'Adm'): tudo
--    • senão: a permissão está em data.perms
--    • usuários antigos (sem a marca 'acessos.v283'): acessos novos saem dos antigos
--    • usuário inativo ou 'pendente' (cadastro aguardando aprovação): nada
-- ---------------------------------------------------------------------
create or replace function public.is_active() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.usuarios u
    where u.id = auth.uid()
      and coalesce((u.data->>'ativo')::boolean, true)
      and coalesce(u.data->>'status','') <> 'pendente'
  );
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.usuarios u
    where u.id = auth.uid()
      and coalesce((u.data->>'ativo')::boolean, true)
      and coalesce(u.data->>'status','') <> 'pendente'
      and (u.data->>'tipo' = 'Adm' or u.data->>'perfil' = 'Administrador')
  );
$$;

create or replace function public.has_perm(p text) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare d jsonb; pr jsonb;
begin
  select u.data into d from public.usuarios u where u.id = auth.uid();
  if d is null or not coalesce((d->>'ativo')::boolean, true) or coalesce(d->>'status','') = 'pendente' then
    return false;
  end if;
  if d->>'tipo' = 'Adm' or d->>'perfil' = 'Administrador' then return true; end if;
  pr := case when jsonb_typeof(d->'perms') = 'array' then d->'perms' else '[]'::jsonb end;
  if pr ? p then return true; end if;
  if not (pr ? 'acessos.v283') then
    if p in ('sup.registros','sup.boletins') then return pr ? 'sup.ver' or pr ? 'sup.bm'; end if;
    if p in ('aud.arquivos','aud.usuarios') then return pr ? 'aud.ver'; end if;
    if p like 'rel.%' then return pr ? 'sup.ver' or pr ? 'ana.ver'; end if;
  end if;
  return false;
end $$;

-- algum dos acessos
create or replace function public.has_any(ps text[]) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(bool_or(public.has_perm(x)), false) from unnest(ps) x;
$$;

-- Primeiro acesso: ainda não existe nenhum usuário?
create or replace function public.bootstrap_needed() returns boolean
language sql stable security definer set search_path = public as $$
  select not exists (select 1 from public.usuarios);
$$;

grant execute on function public.bootstrap_needed() to anon, authenticated;
grant execute on function public.is_active()        to authenticated;
grant execute on function public.is_admin()         to authenticated;
grant execute on function public.has_perm(text)     to authenticated;
grant execute on function public.has_any(text[])    to authenticated;

-- ---------------------------------------------------------------------
-- 3. Novo usuário do Auth -> linha em usuarios
--    • o PRIMEIRO vira Administrador
--    • quem se cadastra sozinho fica 'pendente' até o administrador aprovar
--    • quem o administrador cria (admin_create_user) entra aprovado, sem acessos;
--      o app grava o perfil e as permissões logo em seguida
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare n int; d jsonb; adm_perms jsonb; criado_por_admin boolean;
begin
  adm_perms := '["acessos.v283",
    "rest.registrar","rest.sobras","rest.estornar","rest.data_manual","rest.retroativo","rest.validar",
    "sup.ver","sup.registros","sup.boletins","sup.bm","sup.nf","bm.rem_ass","sup.fechar","sup.fechamento","fotos.ver",
    "ana.ver","rel.registros","rel.financeiro","rel.colaboradores",
    "aud.ver","aud.arquivos","aud.usuarios","fotos.baixar",
    "del.bm","del.sobras","del.registros","del.empresas","del.obras",
    "cfg.contratos","cfg.usuarios","cfg.colab","cfg.empresas","cfg.obras","cfg.precos","cfg.contratada","cfg.horarios",
    "lgpd.gerir","jogo.jogar"]'::jsonb;
  criado_por_admin := coalesce(current_setting('sismed.admin_create', true), '') = '1';
  select count(*) into n from public.usuarios;
  d := jsonb_build_object(
    'nome',  coalesce(nullif(new.raw_user_meta_data->>'nome',''),  split_part(new.email,'@',1)),
    'login', upper(coalesce(nullif(new.raw_user_meta_data->>'login',''), split_part(new.email,'@',1))),
    'email', lower(new.email),
    'ativo', true,
    'status', case when n = 0 or criado_por_admin then 'aprovado' else 'pendente' end,
    'perfil', case when n = 0 then 'Administrador' else 'Personalizado' end,
    'tipo',   case when n = 0 then 'Adm' else '' end,
    'perms',  case when n = 0 then adm_perms else '["acessos.v283"]'::jsonb end,
    'criadoEm', now()
  );
  insert into public.usuarios (id, data) values (new.id, d) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------
-- 4. Auditoria: usuário, IP e navegador carimbados pelo SERVIDOR; trilha imutável
-- ---------------------------------------------------------------------
create or replace function public.auditoria_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare h json;
begin
  begin h := current_setting('request.headers', true)::json; exception when others then h := null; end;
  new.usuario_id := auth.uid();
  new.ip := nullif(trim(split_part(coalesce(h->>'x-forwarded-for', h->>'cf-connecting-ip', ''), ',', 1)), '');
  new.user_agent := left(h->>'user-agent', 200);
  new.created_at := now();
  return new;
end $$;
drop trigger if exists auditoria_before_insert on public.auditoria;
create trigger auditoria_before_insert before insert on public.auditoria
  for each row execute procedure public.auditoria_before_insert();

-- ninguém altera/apaga — só a compactação do próprio servidor (abaixo)
create or replace function public.deny_change() returns trigger language plpgsql as $$
begin
  if tg_table_name = 'auditoria' and coalesce(current_setting('sismed.compactando', true), '') = '1' then
    return old;
  end if;
  raise exception 'Registros de auditoria não podem ser alterados';
end $$;
drop trigger if exists auditoria_immutable on public.auditoria;
create trigger auditoria_immutable before update or delete on public.auditoria
  for each row execute procedure public.deny_change();

-- a cada 3.000 eventos além de 3.000, os mais antigos vão para um CSV em auditoria_arquivos
create or replace function public.auditoria_compactar() returns trigger
language plpgsql security definer set search_path = public as $$
declare n int; lote int := 3000; v_de timestamptz; v_ate timestamptz; v_csv text; ids text[];
  q constant text := chr(34);
begin
  select count(*) into n from public.auditoria;
  if n < 2 * lote then return null; end if;
  perform pg_advisory_xact_lock(hashtext('sismed.auditoria_compactar'));
  select array_agg(id order by created_at, id), min(created_at), max(created_at)
    into ids, v_de, v_ate
    from (select id, created_at from public.auditoria order by created_at, id limit lote) x;
  select 'id;em;usuario;perfil;acao;descricao;aba;obra;empresa;entidade;antes;depois;dispositivo;ip;navegador' || chr(10) ||
         string_agg(concat_ws(';',
           a.id, to_char(a.created_at at time zone 'America/Sao_Paulo','YYYY-MM-DD HH24:MI:SS'),
           q||replace(coalesce(a.data->>'usuario',''),q,q||q)||q, q||replace(coalesce(a.data->>'perfil',''),q,q||q)||q,
           q||replace(coalesce(a.data->>'acao',''),q,q||q)||q,    q||replace(coalesce(a.data->>'descricao',''),q,q||q)||q,
           q||replace(coalesce(a.data->>'aba',''),q,q||q)||q,     q||replace(coalesce(a.data->>'obra',''),q,q||q)||q,
           q||replace(coalesce(a.data->>'empresa',''),q,q||q)||q, q||replace(coalesce(a.data->>'entidade',''),q,q||q)||q,
           q||replace(coalesce(a.data->>'antes',''),q,q||q)||q,   q||replace(coalesce(a.data->>'depois',''),q,q||q)||q,
           q||replace(coalesce(a.data->>'dispositivo',''),q,q||q)||q, coalesce(a.ip,''),
           q||replace(coalesce(a.user_agent, a.data->>'navegador',''),q,q||q)||q), chr(10) order by a.created_at, a.id)
    into v_csv
    from public.auditoria a where a.id = any(ids);
  insert into public.auditoria_arquivos (de, ate, qtd, csv) values (v_de, v_ate, coalesce(array_length(ids,1),0), v_csv);
  perform set_config('sismed.compactando', '1', true);
  delete from public.auditoria where id = any(ids);
  perform set_config('sismed.compactando', '', true);
  return null;
end $$;
drop trigger if exists auditoria_compactar on public.auditoria;
create trigger auditoria_compactar after insert on public.auditoria
  for each statement execute procedure public.auditoria_compactar();

-- grava um evento na Auditoria a partir das funções do servidor (mesmo formato do app)
create or replace function public._audit(p_acao text, p_descricao text, p_extra jsonb default '{}'::jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare u jsonb;
begin
  select data into u from public.usuarios where id = auth.uid();
  insert into public.auditoria (id, data) values (
    'srv-' || substr(md5(random()::text || clock_timestamp()::text), 1, 12),
    jsonb_build_object('em', now(), 'usuarioId', auth.uid(), 'usuario', coalesce(u->>'nome','—'), 'perfil', coalesce(u->>'perfil',''),
      'acao', p_acao, 'descricao', coalesce(p_descricao,''), 'aba', coalesce(p_extra->>'aba','sup'),
      'obra', coalesce(p_extra->>'obra',''), 'empresa', coalesce(p_extra->>'empresa',''), 'entidade', coalesce(p_extra->>'entidade',''),
      'antes', p_extra->'antes', 'depois', null, 'dispositivo', 'servidor', 'ip', null, 'navegador', 'servidor'));
end $$;
revoke all on function public._audit(text, text, jsonb) from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- 5. Row Level Security
-- ---------------------------------------------------------------------
do $$ declare t text; begin
  foreach t in array array['usuarios','perfis','empresas','obras','colaboradores','precos','contratos','contratadas',
                           'registros','sobras','bms','config','auditoria','auditoria_arquivos','notificacoes',
                           'mensagens','sessoes','fotos_arquivos','jogo_pontos'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop; end $$;

create or replace function public._policy(tbl text, name text, cmd text, using_expr text, check_expr text default null)
returns void language plpgsql as $$
begin
  execute format('drop policy if exists %I on public.%I', name, tbl);
  if cmd = 'insert' then
    execute format('create policy %I on public.%I for insert to authenticated with check (%s)', name, tbl, coalesce(check_expr, using_expr));
  elsif cmd = 'update' then
    execute format('create policy %I on public.%I for update to authenticated using (%s) with check (%s)', name, tbl, using_expr, coalesce(check_expr, using_expr));
  else
    execute format('create policy %I on public.%I for %s to authenticated using (%s)', name, tbl, cmd, using_expr);
  end if;
end $$;

-- usuários: ativos veem a lista; cada um lê a própria linha (inclusive pendente); só cfg.usuarios grava
select public._policy('usuarios','usuarios_select','select','public.is_active() or id = auth.uid()');
select public._policy('usuarios','usuarios_insert','insert','public.has_perm(''cfg.usuarios'')');
select public._policy('usuarios','usuarios_update','update','public.has_perm(''cfg.usuarios'')');

select public._policy('perfis','perfis_select','select','public.is_active()');
select public._policy('perfis','perfis_insert','insert','public.has_perm(''cfg.usuarios'')');
select public._policy('perfis','perfis_update','update','public.has_perm(''cfg.usuarios'')');
select public._policy('perfis','perfis_delete','delete','public.has_perm(''cfg.usuarios'')');

-- empresas (inclui terceirizadas); quem emite BM avança o "próximo nº do BM"
select public._policy('empresas','empresas_select','select','public.is_active()');
select public._policy('empresas','empresas_insert','insert','public.has_perm(''cfg.empresas'')');
select public._policy('empresas','empresas_update','update','public.has_any(array[''cfg.empresas'',''sup.bm'',''cfg.contratos''])');
select public._policy('empresas','empresas_delete','delete','public.has_perm(''del.empresas'')');

select public._policy('obras','obras_select','select','public.is_active()');
select public._policy('obras','obras_insert','insert','public.has_any(array[''cfg.obras'',''cfg.contratos''])');
select public._policy('obras','obras_update','update','public.has_any(array[''cfg.obras'',''cfg.contratos''])');
select public._policy('obras','obras_delete','delete','public.has_perm(''del.obras'')');

select public._policy('colaboradores','colab_select','select','public.is_active()');
select public._policy('colaboradores','colab_insert','insert','public.has_perm(''cfg.colab'')');
select public._policy('colaboradores','colab_update','update','public.has_any(array[''cfg.colab'',''cfg.obras''])');
select public._policy('colaboradores','colab_delete','delete','public.has_perm(''cfg.colab'')');

-- preços: histórico — entra linha nova; não se apaga
select public._policy('precos','precos_select','select','public.is_active()');
select public._policy('precos','precos_insert','insert','public.has_perm(''cfg.precos'')');
select public._policy('precos','precos_update','update','public.has_perm(''cfg.precos'')');

select public._policy('contratos','contratos_select','select','public.is_active()');
select public._policy('contratos','contratos_insert','insert','public.has_any(array[''cfg.contratos'',''cfg.obras''])');
select public._policy('contratos','contratos_update','update','public.has_any(array[''cfg.contratos'',''cfg.obras''])');
select public._policy('contratos','contratos_delete','delete','public.has_perm(''cfg.contratos'')');

select public._policy('contratadas','contratadas_select','select','public.is_active()');
select public._policy('contratadas','contratadas_insert','insert','public.has_perm(''cfg.contratada'')');
select public._policy('contratadas','contratadas_update','update','public.has_perm(''cfg.contratada'')');
select public._policy('contratadas','contratadas_delete','delete','public.has_perm(''cfg.contratada'')');

-- config: cada linha tem o seu acesso
select public._policy('config','config_select','select','public.is_active()');
select public._policy('config','config_insert','insert',
  $p$ case when id = 'contratada' then public.has_perm('cfg.contratada')
           when id = 'horarios'   then public.has_perm('cfg.horarios')
           when id = 'lgpd'       then public.has_perm('lgpd.gerir')
           when id like 'fech:%'  then public.has_any(array['sup.fechamento','cfg.contratada'])
           else public.is_admin() end $p$);
select public._policy('config','config_update','update',
  $p$ case when id = 'contratada' then public.has_perm('cfg.contratada')
           when id = 'horarios'   then public.has_perm('cfg.horarios')
           when id = 'lgpd'       then public.has_perm('lgpd.gerir')
           when id like 'fech:%'  then public.has_any(array['sup.fechamento','cfg.contratada'])
           else public.is_admin() end $p$);

-- registros de refeição
select public._policy('registros','registros_select','select','public.is_active()');
select public._policy('registros','registros_insert','insert','public.has_any(array[''rest.registrar'',''rest.retroativo''])');
select public._policy('registros','registros_update','update',
  'public.has_any(array[''sup.bm'',''sup.fechar'',''sup.fechamento'',''cfg.empresas'',''cfg.obras'',''cfg.colab'',''del.bm'',''rest.registrar''])');
-- estorno do dia vai pela função estornar_registros; aqui: exclusões em massa (empresa/obra) e o caminho antigo
select public._policy('registros','registros_delete','delete',
  'public.has_any(array[''del.empresas'',''del.obras'']) or (bm_id is null and public.has_any(array[''rest.estornar'',''del.registros'']))');

-- sobras
select public._policy('sobras','sobras_select','select','public.is_active()');
select public._policy('sobras','sobras_insert','insert','public.has_perm(''rest.sobras'')');
select public._policy('sobras','sobras_update','update','public.has_any(array[''rest.sobras'',''sup.bm'',''sup.fechar'',''cfg.empresas'',''cfg.obras'',''del.bm''])');
select public._policy('sobras','sobras_delete','delete','public.has_any(array[''rest.sobras'',''del.sobras'',''del.empresas'',''del.obras''])');

-- boletins
select public._policy('bms','bms_select','select','public.is_active()');
select public._policy('bms','bms_insert','insert','public.has_perm(''sup.bm'')');
select public._policy('bms','bms_update','update','public.has_any(array[''sup.bm'',''rest.validar'',''sup.nf'',''bm.rem_ass'',''cfg.empresas'',''cfg.obras''])');
select public._policy('bms','bms_delete','delete','public.has_any(array[''del.bm'',''del.empresas''])');

-- auditoria: qualquer ativo grava; só aud.ver lê
select public._policy('auditoria','auditoria_insert','insert','public.is_active()');
select public._policy('auditoria','auditoria_select','select','public.has_perm(''aud.ver'')');
select public._policy('auditoria_arquivos','audarq_select','select','public.has_perm(''aud.arquivos'')');

-- notificações: qualquer ativo envia; cada um lê as que são para ele
select public._policy('notificacoes','notif_insert','insert','public.is_active()');
select public._policy('notificacoes','notif_select','select',
  $p$ public.is_active() and (coalesce(data->'para','[]'::jsonb) ? auth.uid()::text or public.is_admin()) $p$);

-- mensagens: remetente é sempre o próprio usuário; lê quem enviou, quem recebeu e o administrador
select public._policy('mensagens','msg_insert','insert','public.is_active() and de = auth.uid()');
select public._policy('mensagens','msg_select','select','public.is_active() and (de = auth.uid() or para = auth.uid() or public.is_admin())');

-- sessões: cada um grava as suas; aud.usuarios lê todas
select public._policy('sessoes','sessoes_insert','insert',$p$ public.is_active() and data->>'usuarioId' = auth.uid()::text $p$);
select public._policy('sessoes','sessoes_update','update',$p$ public.is_active() and data->>'usuarioId' = auth.uid()::text $p$);
select public._policy('sessoes','sessoes_select','select',$p$ data->>'usuarioId' = auth.uid()::text or public.has_perm('aud.usuarios') $p$);

select public._policy('fotos_arquivos','fotosarq_select','select','public.has_any(array[''aud.arquivos'',''fotos.baixar''])');
-- jogo_pontos: só pelas funções jogo_registrar / jogo_ranking

-- ---------------------------------------------------------------------
-- 6. Funções chamadas pelo app (supabase.rpc)
-- ---------------------------------------------------------------------

-- login: aceita o "usuário" (login) e devolve o e-mail de entrada
create or replace function public.email_por_login(p_login text) returns text
language sql stable security definer set search_path = public as $$
  select u.data->>'email' from public.usuarios u
  where upper(u.data->>'login') = upper(trim(p_login)) limit 1;
$$;
grant execute on function public.email_por_login(text) to anon, authenticated;

-- cadastro: o login está livre? (sem revelar e-mail de ninguém)
create or replace function public.login_livre(p_login text) returns boolean
language sql stable security definer set search_path = public as $$
  select not exists (select 1 from public.usuarios u where upper(u.data->>'login') = upper(trim(p_login)));
$$;
grant execute on function public.login_livre(text) to anon, authenticated;

-- aviso de privacidade antes do login
create or replace function public.lgpd_publico() returns jsonb
language sql stable security definer set search_path = public as $$
  select data from public.config where id = 'lgpd';
$$;
grant execute on function public.lgpd_publico() to anon, authenticated;

-- atualiza linhas que já existem; devolve os ids atualizados (o app manda o resto por upsert)
-- roda com as permissões de quem chama (RLS vale normalmente)
create or replace function public.sync_update(p_table text, p_rows jsonb) returns text[]
language plpgsql security invoker set search_path = public as $$
declare r jsonb; ok text[] := '{}'; v_id text;
begin
  if p_table not in ('usuarios','perfis','empresas','obras','colaboradores','precos','contratos','contratadas','registros','sobras','bms') then
    raise exception 'Dados inválidos: tabela % não permitida', p_table;
  end if;
  if jsonb_typeof(p_rows) <> 'array' then raise exception 'Dados inválidos: p_rows'; end if;
  for r in select * from jsonb_array_elements(p_rows) loop
    if jsonb_typeof(r->'data') <> 'object' or coalesce(r->>'id','') = '' then continue; end if;
    v_id := null;
    if p_table = 'usuarios' then
      execute 'update public.usuarios set data = $1 where id = $2::uuid returning id::text' into v_id using r->'data', r->>'id';
    else
      execute format('update public.%I set data = $1 where id = $2 returning id', p_table) into v_id using r->'data', r->>'id';
    end if;
    if v_id is not null then ok := ok || v_id; end if;
  end loop;
  return ok;
end $$;
grant execute on function public.sync_update(text, jsonb) to authenticated;

-- dia validado no Fechamento (dia inteiro, ou dia + obra + contrato)?
create or replace function public.dia_validado(p_dia text, p_obra text, p_contrato text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.config c
    where c.id in ('fech:' || p_dia, 'fech:' || p_dia || '|' || coalesce(nullif(p_obra,''),'-') || '|' || coalesce(nullif(p_contrato,''),'-'))
      and coalesce((c.data->>'validado')::boolean, false));
$$;
grant execute on function public.dia_validado(text, text, text) to authenticated;

-- o usuário pode mexer nesta refeição? (usuário restrito a restaurantes/obras)
create or replace function public._alcance_ok(r jsonb) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((
    select (coalesce(jsonb_typeof(u.data->'contratadas'),'') <> 'array' or jsonb_array_length(u.data->'contratadas') = 0
              or (u.data->'contratadas') ? coalesce(r->>'contratadaId',''))
       and (coalesce(jsonb_typeof(u.data->'obras'),'') <> 'array' or jsonb_array_length(u.data->'obras') = 0
              or (u.data->'obras') ? coalesce(r->>'obraId',''))
    from public.usuarios u where u.id = auth.uid()), false) or public.is_admin();
$$;

-- estorno de refeições (Restaurante) — só de hoje (ou do lote retroativo), fora de BM, não fechada, dia não validado
create or replace function public.estornar_registros(p_ids text[], p_motivo text, p_lote text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_id text; r jsonb; v_bm text; recusados jsonb := '[]'::jsonb; estornados text[] := '{}';
  hoje text := to_char(now() at time zone 'America/Sao_Paulo', 'YYYY-MM-DD'); motivo text;
begin
  if not public.has_perm('rest.estornar') and not (p_lote is not null and public.has_perm('rest.retroativo')) then
    raise exception 'Dados inválidos: sem permissão para estornar';
  end if;
  if char_length(trim(coalesce(p_motivo,''))) < 5 then raise exception 'Dados inválidos: informe a justificativa'; end if;
  foreach v_id in array coalesce(p_ids, '{}') loop
    select data, bm_id into r, v_bm from public.registros where id = v_id for update;
    if r is null then continue; end if;   -- já saiu (outro aparelho)
    motivo := case
      when v_bm is not null then 'está no BM'
      when coalesce((r->>'fechado')::boolean, false) then 'refeição fechada sem BM'
      when p_lote is null and r->>'data' <> hoje then 'não é de hoje'
      when public.dia_validado(r->>'data', r->>'obraId', r->>'contratoId') then 'dia validado no Fechamento'
      when not public._alcance_ok(r) then 'fora do seu restaurante/obra'
      else null end;
    if motivo is not null then
      recusados := recusados || jsonb_build_object('id', v_id, 'motivo', motivo);
      continue;
    end if;
    delete from public.registros where id = v_id;
    estornados := estornados || v_id;
    perform public._audit(case when p_lote is null then 'refeicao.estornar' else 'refeicao.retroativo_estornar' end,
      format('%s de %s (R$ %s) registrada em %s — motivo: %s', coalesce(r->>'tipo',''), coalesce(r->>'nome',''),
             coalesce(r->>'valor','0'), coalesce(r->>'registradoEm',''), trim(p_motivo)),
      jsonb_build_object('aba','rest','obra', r->>'obraNome', 'empresa', r->>'empresaNome',
        'entidade', case when p_lote is null then 'registro ' || v_id else 'lote retroativo ' || p_lote end, 'antes', r::text));
  end loop;
  return jsonb_build_object('estornados', to_jsonb(estornados), 'recusados', recusados);
end $$;
grant execute on function public.estornar_registros(text[], text, text) to authenticated;

-- exclusão avulsa (Administrativo › Registros) — qualquer dia, fora de BM, dia não validado
create or replace function public.excluir_registro(p_id text, p_motivo text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb; v_bm text;
begin
  if not (public.is_admin() or public.has_perm('del.registros')) then
    raise exception 'Dados inválidos: sem permissão para excluir registro';
  end if;
  if char_length(trim(coalesce(p_motivo,''))) < 5 then raise exception 'Dados inválidos: informe a justificativa'; end if;
  select data, bm_id into r, v_bm from public.registros where id = p_id for update;
  if r is null then return jsonb_build_object('excluido', false); end if;
  if v_bm is not null then raise exception 'Dados inválidos: a refeição está em BM'; end if;
  if public.dia_validado(r->>'data', r->>'obraId', r->>'contratoId') then
    raise exception 'Dados inválidos: o dia % foi validado no Fechamento — reabra antes', r->>'data';
  end if;
  if not public._alcance_ok(r) then raise exception 'Dados inválidos: fora do seu restaurante/obra'; end if;
  delete from public.registros where id = p_id;
  perform public._audit('refeicao.excluir',
    format('%s de %s em %s (R$ %s) — motivo: %s', coalesce(r->>'tipo',''), coalesce(r->>'nome',''), coalesce(r->>'data',''),
           coalesce(r->>'valor','0'), trim(p_motivo)),
    jsonb_build_object('aba','sup','obra', r->>'obraNome', 'empresa', r->>'empresaNome', 'entidade', 'registro ' || p_id, 'antes', r::text));
  return jsonb_build_object('excluido', true);
end $$;
grant execute on function public.excluir_registro(text, text) to authenticated;

-- administração de contas (Configurações › Usuários)
create or replace function public.admin_create_user(p_email text, p_password text, p_nome text, p_login text) returns uuid
language plpgsql security definer set search_path = public, extensions, auth as $$
declare v_id uuid := gen_random_uuid(); v_email text := lower(trim(p_email));
begin
  if not public.has_perm('cfg.usuarios') then raise exception 'Sem permissão para criar usuários'; end if;
  if char_length(coalesce(p_password,'')) < 6 then raise exception 'Senha curta demais'; end if;
  if exists (select 1 from auth.users where lower(email) = v_email) then raise exception 'Já existe uma conta com este e-mail'; end if;
  if not public.login_livre(p_login) then raise exception 'Este usuário já existe'; end if;
  perform set_config('sismed.admin_create', '1', true);
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
                          raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
                          confirmation_token, recovery_token, email_change_token_new, email_change)
  values ('00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated', v_email,
          crypt(p_password, gen_salt('bf')), now(),
          '{"provider":"email","providers":["email"]}'::jsonb,
          jsonb_build_object('nome', p_nome, 'login', upper(p_login)), now(), now(), '', '', '', '');
  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), v_id, v_id::text,
          jsonb_build_object('sub', v_id::text, 'email', v_email, 'email_verified', true),
          'email', now(), now(), now());
  perform set_config('sismed.admin_create', '', true);
  return v_id;
end $$;
grant execute on function public.admin_create_user(text, text, text, text) to authenticated;

create or replace function public.admin_set_password(target uuid, new_password text) returns void
language plpgsql security definer set search_path = public, extensions, auth as $$
begin
  if not public.has_perm('cfg.usuarios') then raise exception 'Sem permissão para redefinir senha'; end if;
  if char_length(coalesce(new_password,'')) < 6 then raise exception 'Senha curta demais'; end if;
  if exists (select 1 from public.usuarios where id = target and (data->>'tipo' = 'Adm' or data->>'perfil' = 'Administrador'))
     and not public.is_admin() then
    raise exception 'Só o administrador redefine a senha de outro administrador';
  end if;
  update auth.users set encrypted_password = crypt(new_password, gen_salt('bf')), updated_at = now() where id = target;
  if not found then raise exception 'Usuário não encontrado'; end if;
end $$;
grant execute on function public.admin_set_password(uuid, text) to authenticated;

create or replace function public.admin_delete_user(target uuid) returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.has_perm('cfg.usuarios') then raise exception 'Sem permissão para excluir usuários'; end if;
  if target = auth.uid() then raise exception 'Você não pode excluir o seu próprio usuário'; end if;
  if exists (select 1 from public.usuarios where id = target and (data->>'tipo' = 'Adm' or data->>'perfil' = 'Administrador'))
     and not public.is_admin() then
    raise exception 'Só o administrador exclui outro administrador';
  end if;
  delete from auth.users where id = target;   -- a linha em usuarios sai junto (on delete cascade)
end $$;
grant execute on function public.admin_delete_user(uuid) to authenticated;

-- uso do armazenamento de fotos (Auditoria › Arquivos compactados › Fotos)
create or replace function public.fotos_uso() returns jsonb
language sql stable security definer set search_path = public, storage as $$
  select case when not public.has_any(array['aud.arquivos','fotos.baixar']) then null else jsonb_build_object(
    'consulta_qtd',   count(*) filter (where bucket_id = 'fotos' and name like 'c/%'),
    'consulta_bytes', coalesce(sum((metadata->>'size')::bigint) filter (where bucket_id = 'fotos' and name like 'c/%'), 0),
    'pendente_qtd',   count(*) filter (where bucket_id = 'fotos' and name like 'a/%'),
    'pendente_bytes', coalesce(sum((metadata->>'size')::bigint) filter (where bucket_id = 'fotos' and name like 'a/%'), 0),
    'zip_qtd',        count(*) filter (where bucket_id = 'fotos' and name like 'z/%'),
    'zip_bytes',      coalesce(sum((metadata->>'size')::bigint) filter (where bucket_id = 'fotos' and name like 'z/%'), 0),
    'total_bytes',    coalesce(sum((metadata->>'size')::bigint), 0),
    'limite_bytes',   1073741824) end
  from storage.objects;
$$;
grant execute on function public.fotos_uso() to authenticated;

-- Jogo da Capivara
create or replace function public.jogo_registrar(p_pontos integer) returns void
language plpgsql security definer set search_path = public as $$
declare v_nome text; p int := greatest(0, least(coalesce(p_pontos,0), 100000));
begin
  if not public.is_active() then raise exception 'Usuário inativo'; end if;
  select coalesce(data->>'nome','') into v_nome from public.usuarios where id = auth.uid();
  insert into public.jogo_pontos as j (usuario_id, nome, recorde, partidas, refeicoes, recorde_em, ultima_em)
  values (auth.uid(), v_nome, p, 1, p, case when p > 0 then now() end, now())
  on conflict (usuario_id) do update set
    nome = excluded.nome, partidas = j.partidas + 1, refeicoes = j.refeicoes + p, ultima_em = now(),
    recorde = greatest(j.recorde, p), recorde_em = case when p > j.recorde then now() else j.recorde_em end;
end $$;
grant execute on function public.jogo_registrar(integer) to authenticated;

create or replace function public.jogo_ranking() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'top', coalesce((select jsonb_agg(jsonb_build_object('nome', t.nome, 'recorde', t.recorde, 'eu', t.usuario_id = auth.uid()) order by t.recorde desc, t.recorde_em)
                     from (select * from public.jogo_pontos where recorde > 0 order by recorde desc, recorde_em limit 10) t), '[]'::jsonb),
    'eu', (select jsonb_build_object('recorde', recorde, 'partidas', partidas, 'refeicoes', refeicoes) from public.jogo_pontos where usuario_id = auth.uid()))
  where public.is_active();
$$;
grant execute on function public.jogo_ranking() to authenticated;

-- ---------------------------------------------------------------------
-- 7. Armazenamento
--    anexos: BMs assinados (PDF/imagem)
--    fotos:  c/AAAA-MM-DD/id.webp (consulta, 20 dias) · a/... (aguardando compactação) · z/AAAA-MM-DD.zip (12 meses)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('anexos', 'anexos', false, 10485760, array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos', 'fotos', false, 52428800, array['image/webp','image/jpeg','application/zip'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists anexos_select on storage.objects;
create policy anexos_select on storage.objects for select to authenticated
  using (bucket_id = 'anexos' and public.is_active());
drop policy if exists anexos_insert on storage.objects;
create policy anexos_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'anexos' and public.has_perm('sup.nf'));
drop policy if exists anexos_delete on storage.objects;
create policy anexos_delete on storage.objects for delete to authenticated
  using (bucket_id = 'anexos' and public.has_any(array['sup.nf','del.bm','del.empresas']));

drop policy if exists fotos_insert on storage.objects;
create policy fotos_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'fotos' and (name like 'c/%' or name like 'a/%')
              and public.has_any(array['rest.registrar','rest.retroativo']));
drop policy if exists fotos_select on storage.objects;
create policy fotos_select on storage.objects for select to authenticated
  using (bucket_id = 'fotos' and (
         (name like 'c/%' and public.has_perm('fotos.ver'))
      or (name like 'z/%' and public.has_perm('fotos.baixar'))));

-- ---------------------------------------------------------------------
-- 8. Prazos de guarda (LGPD): mensagens 7 dias, notificações 30 dias, sessões 90 dias
--    Agenda diária com pg_cron quando a extensão estiver ligada (Database › Extensions › pg_cron).
-- ---------------------------------------------------------------------
create or replace function public.limpeza_retencao() returns void
language sql security definer set search_path = public as $$
  delete from public.mensagens    where created_at < now() - interval '7 days';
  delete from public.notificacoes where created_at < now() - interval '30 days';
  delete from public.sessoes      where coalesce(data->>'ultimo', data->>'inicio', '') < to_char(now() - interval '90 days', 'YYYY-MM-DD');
$$;
revoke all on function public.limpeza_retencao() from public, anon, authenticated;

do $$ begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(jobid) from cron.job where jobname = 'sismed-limpeza';
    perform cron.schedule('sismed-limpeza', '17 6 * * *', 'select public.limpeza_retencao()');
  end if;
end $$;

-- ---------------------------------------------------------------------
-- 9. Limpeza de dados de TESTE (rodar manualmente, nunca em produção)
-- ---------------------------------------------------------------------
-- truncate public.registros, public.sobras, public.bms;
