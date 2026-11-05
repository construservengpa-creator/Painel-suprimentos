-- Créditos → anexos do crédito (relatório de origem).
-- Arquiva o documento que deu origem ao crédito (relatório, planilha,
-- e-mail, termo de acordo...) junto do crédito lançado em "Crédito entre
-- Obras". O arquivo fica no Storage do Supabase (bucket privado
-- "creditos-anexos") e os dados do arquivo na tabela creditos_anexos.
--
-- Mesmas regras de acesso das demais tabelas de crédito: só admin ou
-- supervisor (private.is_gestor_credito). Excluir o crédito apaga os
-- registros de anexo (on delete cascade); o painel também remove os
-- arquivos do bucket. Pode rodar de novo: recria as políticas.

-- 1) Tabela. A coluna credito_id é criada com o mesmo tipo de
--    creditos_obra.id (uuid ou bigint), seja qual for.
do $$
declare
  tipo_id text;
begin
  select format_type(a.atttypid, a.atttypmod) into tipo_id
    from pg_attribute a
   where a.attrelid = 'public.creditos_obra'::regclass
     and a.attname = 'id' and not a.attisdropped;

  execute format($f$
    create table if not exists public.creditos_anexos (
      id          uuid primary key default gen_random_uuid(),
      credito_id  %s not null references public.creditos_obra(id) on delete cascade,
      nome        text not null,
      caminho     text not null unique,
      tamanho     bigint,
      tipo        text,
      enviado_por uuid default auth.uid(),
      enviado_em  timestamptz not null default now()
    )$f$, tipo_id);
end $$;

create index if not exists creditos_anexos_credito_idx
  on public.creditos_anexos (credito_id);

alter table public.creditos_anexos enable row level security;

drop policy if exists "leitura anexos de credito" on public.creditos_anexos;
create policy "leitura anexos de credito" on public.creditos_anexos
  for select using (private.is_gestor_credito(auth.uid()));

drop policy if exists "grava anexos de credito" on public.creditos_anexos;
create policy "grava anexos de credito" on public.creditos_anexos
  for insert with check (private.is_gestor_credito(auth.uid()));

drop policy if exists "exclui anexos de credito" on public.creditos_anexos;
create policy "exclui anexos de credito" on public.creditos_anexos
  for delete using (private.is_gestor_credito(auth.uid()));

-- 2) Bucket privado (sem link público: o painel abre o arquivo por um
--    link assinado de poucos minutos). Limite de 20 MB por arquivo.
insert into storage.buckets (id, name, public, file_size_limit)
values ('creditos-anexos', 'creditos-anexos', false, 20971520)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

drop policy if exists "creditos-anexos leitura" on storage.objects;
create policy "creditos-anexos leitura" on storage.objects
  for select using (bucket_id = 'creditos-anexos' and private.is_gestor_credito(auth.uid()));

drop policy if exists "creditos-anexos envio" on storage.objects;
create policy "creditos-anexos envio" on storage.objects
  for insert with check (bucket_id = 'creditos-anexos' and private.is_gestor_credito(auth.uid()));

drop policy if exists "creditos-anexos exclusao" on storage.objects;
create policy "creditos-anexos exclusao" on storage.objects
  for delete using (bucket_id = 'creditos-anexos' and private.is_gestor_credito(auth.uid()));
