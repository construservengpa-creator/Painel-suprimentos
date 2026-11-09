-- =====================================================================
--  Medição de Refeições — banco de dados Supabase (Postgres)
--  Versão 1.0 — 2026-09-23
--  Execute este arquivo inteiro no SQL Editor do projeto (ou via migração).
--  Pode ser executado mais de uma vez (idempotente).
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Tabelas (modelo "documento": id + data jsonb)
--    Mantém o mesmo formato de objeto usado pelo app, o que facilita
--    exportar/migrar para outra base no futuro (basta exportar o jsonb).
-- ---------------------------------------------------------------------
create table if not exists public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.empresas      (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.obras         (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.colaboradores (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.precos        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.registros (
  id text primary key,
  data jsonb not null,
  bm_id text generated always as (data->>'bmId') stored,
  updated_at timestamptz not null default now()
);
create table if not exists public.sobras        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.bms           (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.config        (id text primary key, data jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.auditoria (
  id text primary key,
  data jsonb not null,
  usuario_id uuid,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists registros_data_idx   on public.registros ((data->>'data'));
create index if not exists registros_emp_idx    on public.registros ((data->>'empresaId'));
create index if not exists registros_bm_idx     on public.registros (bm_id);
create index if not exists colab_qr_idx         on public.colaboradores (lower(data->>'qr'));
create index if not exists auditoria_created_idx on public.auditoria (created_at desc);
create index if not exists auditoria_user_idx   on public.auditoria (usuario_id);

-- updated_at automático
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
do $$ declare t text; begin
  foreach t in array array['usuarios','empresas','obras','colaboradores','precos','registros','sobras','bms','config'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute procedure public.set_updated_at()', t);
  end loop; end $$;

-- ---------------------------------------------------------------------
-- 2. Funções de permissão (usadas pelas políticas RLS)
-- ---------------------------------------------------------------------
create or replace function public.is_active() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.usuarios u
    where u.id = auth.uid() and coalesce((u.data->>'ativo')::boolean, true)
  );
$$;

create or replace function public.has_perm(p text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.usuarios u
    where u.id = auth.uid()
      and coalesce((u.data->>'ativo')::boolean, true)
      and (u.data->'perms') ? p
  );
$$;

-- Primeiro acesso: informa ao app se ainda não existe nenhum usuário
create or replace function public.bootstrap_needed() returns boolean
language sql stable security definer set search_path = public as $$
  select not exists (select 1 from public.usuarios);
$$;
grant execute on function public.bootstrap_needed() to anon, authenticated;
grant execute on function public.is_active() to authenticated;
grant execute on function public.has_perm(text) to authenticated;

-- ---------------------------------------------------------------------
-- 3. Novo usuário do Auth -> linha em usuarios
--    O PRIMEIRO usuário criado vira Administrador com todas as permissões.
--    Os demais entram sem permissão nenhuma até o administrador liberar.
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare n int; d jsonb; all_perms jsonb;
begin
  all_perms := '["rest.registrar","rest.sobras","rest.estornar","rest.validar",
                 "sup.ver","sup.bm","sup.nf","aud.ver",
                 "cfg.usuarios","cfg.colab","cfg.empresas","cfg.obras","cfg.precos","cfg.contratada"]'::jsonb;
  select count(*) into n from public.usuarios;
  d := jsonb_build_object(
    'nome',  coalesce(new.raw_user_meta_data->>'nome',  split_part(new.email,'@',1)),
    'login', coalesce(new.raw_user_meta_data->>'login', split_part(new.email,'@',1)),
    'email', new.email,
    'ativo', true,
    'perfil', case when n = 0 then 'Administrador' else 'Personalizado' end,
    'perms',  case when n = 0 then all_perms else '[]'::jsonb end
  );
  insert into public.usuarios (id, data) values (new.id, d) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------
-- 4. Auditoria: carimbo de usuário, IP e navegador feito pelo SERVIDOR
--    (o app não consegue forjar; o IP vem do cabeçalho da requisição)
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

-- Trilha imutável: ninguém altera ou apaga (nem via API)
create or replace function public.deny_change() returns trigger language plpgsql as $$
begin raise exception 'Registros de auditoria não podem ser alterados'; end $$;
drop trigger if exists auditoria_immutable on public.auditoria;
create trigger auditoria_immutable before update or delete on public.auditoria
  for each row execute procedure public.deny_change();

-- Histórico de preços também é imutável (só entram linhas novas)
drop trigger if exists precos_immutable on public.precos;
create trigger precos_immutable before update or delete on public.precos
  for each row execute procedure public.deny_change();

-- ---------------------------------------------------------------------
-- 5. Row Level Security — quem pode ver/alterar o quê
-- ---------------------------------------------------------------------
alter table public.usuarios      enable row level security;
alter table public.empresas      enable row level security;
alter table public.obras         enable row level security;
alter table public.colaboradores enable row level security;
alter table public.precos        enable row level security;
alter table public.registros     enable row level security;
alter table public.sobras        enable row level security;
alter table public.bms           enable row level security;
alter table public.config        enable row level security;
alter table public.auditoria     enable row level security;

-- helper para (re)criar políticas sem erro
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

-- usuários: todos os ativos veem a lista (nomes); só cfg.usuarios altera; o próprio usuário pode ler sua linha
select public._policy('usuarios','usuarios_select','select','public.is_active() or id = auth.uid()');
select public._policy('usuarios','usuarios_insert','insert','public.has_perm(''cfg.usuarios'')');
select public._policy('usuarios','usuarios_update','update','public.has_perm(''cfg.usuarios'')');

-- cadastros
select public._policy('empresas','empresas_select','select','public.is_active()');
select public._policy('empresas','empresas_write_i','insert','public.has_perm(''cfg.empresas'')');
select public._policy('empresas','empresas_write_u','update','public.has_perm(''cfg.empresas'') or public.has_perm(''sup.bm'')');  -- sup.bm: avança o nº do BM

select public._policy('obras','obras_select','select','public.is_active()');
select public._policy('obras','obras_write_i','insert','public.has_perm(''cfg.obras'')');
select public._policy('obras','obras_write_u','update','public.has_perm(''cfg.obras'')');

select public._policy('colaboradores','colab_select','select','public.is_active()');
select public._policy('colaboradores','colab_write_i','insert','public.has_perm(''cfg.colab'')');
select public._policy('colaboradores','colab_write_u','update','public.has_perm(''cfg.colab'')');

select public._policy('precos','precos_select','select','public.is_active()');
select public._policy('precos','precos_insert','insert','public.has_perm(''cfg.precos'')');

select public._policy('config','config_select','select','public.is_active()');
select public._policy('config','config_write_i','insert','public.has_perm(''cfg.contratada'')');
select public._policy('config','config_write_u','update','public.has_perm(''cfg.contratada'')');

-- registros de refeição
select public._policy('registros','registros_select','select','public.is_active()');
select public._policy('registros','registros_insert','insert','public.has_perm(''rest.registrar'')');
select public._policy('registros','registros_delete','delete','public.has_perm(''rest.estornar'') and bm_id is null');
select public._policy('registros','registros_update','update','public.has_perm(''sup.bm'')');  -- vincular ao BM

-- sobras
select public._policy('sobras','sobras_select','select','public.is_active()');
select public._policy('sobras','sobras_insert','insert','public.has_perm(''rest.sobras'')');
select public._policy('sobras','sobras_delete','delete','public.has_perm(''rest.sobras'')');

-- boletins
select public._policy('bms','bms_select','select','public.is_active()');
select public._policy('bms','bms_insert','insert','public.has_perm(''sup.bm'')');
select public._policy('bms','bms_update','update','public.has_perm(''sup.bm'') or public.has_perm(''rest.validar'') or public.has_perm(''sup.nf'')');

-- auditoria: qualquer usuário ativo grava; só aud.ver lê; ninguém altera/apaga
select public._policy('auditoria','auditoria_insert','insert','public.is_active()');
select public._policy('auditoria','auditoria_select','select','public.has_perm(''aud.ver'')');

-- ---------------------------------------------------------------------
-- 6. Storage: bucket privado para os BMs assinados
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('anexos', 'anexos', false, 10485760, array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists anexos_select on storage.objects;
create policy anexos_select on storage.objects for select to authenticated
  using (bucket_id = 'anexos' and public.is_active());
drop policy if exists anexos_insert on storage.objects;
create policy anexos_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'anexos' and public.has_perm('sup.nf'));
drop policy if exists anexos_delete on storage.objects;
create policy anexos_delete on storage.objects for delete to authenticated
  using (bucket_id = 'anexos' and public.has_perm('sup.nf'));

-- ---------------------------------------------------------------------
-- 7. Limpeza de dados de TESTE (rodar manualmente, nunca em produção)
-- ---------------------------------------------------------------------
-- truncate public.registros, public.sobras, public.bms;
-- (auditoria e preços são imutáveis por design; para zerá-los em ambiente de
--  teste, desative os gatilhos: alter table public.auditoria disable trigger auditoria_immutable; ...)
