-- Consumo por Aplicação: relatório "Apropriações de Insumos" do Sienge.
--
-- Um arquivo por obra (ex.: 5 - Equipamentos, 63 - Frotas RAF - Geral). Cada
-- subetapa do relatório é uma aplicação (equipamento ou veículo, pelo prefixo
-- no início da subetapa: MN-05, CB-4H12...), com os insumos apropriados e
-- consumidos (quantidade e valor). Importar de novo o arquivo de uma obra
-- substitui só aquela obra.
--
-- Uma linha por obra (a última importação vale):
--   dados = { z: '<gzip+base64 de {fields, dim:{u,c,e,s}, rows, totalObra, soma}>' }
--   (o painel compacta para a nuvem; sem compactação no navegador grava o JSON direto)
--
-- Acesso: o mesmo do Controle de CAP — admin, supervisor ou operador avançado.
-- Leitura por private.tema_liberado(usuário, 'cap'); gravação por
-- private.pode_lancar_cap (mesmo grupo). No painel, o menu Frotas (Apropriação e
-- Aplicação) só aparece para esse grupo. Sem a tabela ou sem permissão, o painel
-- guarda a importação só no navegador. Pode rodar de novo: recria as políticas.

-- base anterior (observações das solicitações), substituída por esta
drop table if exists public.consumo_aplicacao;
drop function if exists public.consumo_aplicacao_toca();

create table if not exists public.consumo_apropriacoes (
  obra          text primary key,
  obra_nome     text,
  periodo       text,
  nome_arquivo  text,
  total_linhas  integer,
  dados         jsonb not null,
  importado_por uuid default auth.uid(),
  importado_em  timestamptz not null default now()
);

-- cada nova importação atualiza a data (o navegador compara para saber se baixa de novo)
create or replace function public.consumo_apropriacoes_toca()
returns trigger language plpgsql as $$
begin
  new.importado_em := now();
  new.importado_por := auth.uid();
  return new;
end $$;
drop trigger if exists consumo_apropriacoes_toca on public.consumo_apropriacoes;
create trigger consumo_apropriacoes_toca before insert or update on public.consumo_apropriacoes
  for each row execute function public.consumo_apropriacoes_toca();

alter table public.consumo_apropriacoes enable row level security;
grant select, insert, update, delete on public.consumo_apropriacoes to authenticated;

drop policy if exists "leitura consumo apropriacoes" on public.consumo_apropriacoes;
create policy "leitura consumo apropriacoes" on public.consumo_apropriacoes
  for select using (private.tema_liberado((select auth.uid()), 'cap'));

drop policy if exists "grava consumo apropriacoes" on public.consumo_apropriacoes;
create policy "grava consumo apropriacoes" on public.consumo_apropriacoes
  for insert with check (private.pode_lancar_cap(auth.uid()));

drop policy if exists "edita consumo apropriacoes" on public.consumo_apropriacoes;
create policy "edita consumo apropriacoes" on public.consumo_apropriacoes
  for update using (private.pode_lancar_cap(auth.uid()))
  with check (private.pode_lancar_cap(auth.uid()));

drop policy if exists "exclui consumo apropriacoes" on public.consumo_apropriacoes;
create policy "exclui consumo apropriacoes" on public.consumo_apropriacoes
  for delete using (private.pode_lancar_cap(auth.uid()));
