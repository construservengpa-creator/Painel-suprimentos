-- Consumo por Aplicação: observações das solicitações e lista de aplicações.
--
-- O relatório principal do Sienge (solicitação × pedido × NF) não traz a
-- observação da solicitação, onde fica o prefixo do equipamento/veículo
-- (MN 10, CB-4H12...). Ela vem do relatório de solicitações do Sienge
-- (.xlsx com "Nº da solicitação" e "Observação da solicitação"), importado
-- na aba "Consumo por Aplicação". O painel guarda só as solicitações que
-- citam algum prefixo da lista e as cruza com os pedidos e notas fiscais do
-- relatório principal pelo nº da solicitação.
--
-- Uma linha por tipo (a última importação vale):
--   tipo = 'observacoes' → dados = { fields:['n','dt','sol','obs'], rows:[[...]], lidas, periodo:[de,ate] }
--   tipo = 'aplicacoes'  → dados = { fields:['p','d','t'], rows:[[prefixo, descrição, tipo]] }
--                           (sem esta linha, vale a lista padrão embutida no painel)
--
-- Leitura: qualquer usuário logado. Gravação: admin, supervisor ou operador
-- avançado (private.pode_lancar_cap). Sem a tabela ou sem permissão, o painel
-- guarda a importação só no navegador. Pode rodar de novo: recria as políticas.

create table if not exists public.consumo_aplicacao (
  tipo          text primary key check (tipo in ('observacoes','aplicacoes')),
  nome_arquivo  text,
  total         integer,
  dados         jsonb not null,
  importado_por uuid default auth.uid(),
  importado_em  timestamptz not null default now()
);

-- cada nova importação atualiza a data (o navegador compara para saber se baixa de novo)
create or replace function public.consumo_aplicacao_toca()
returns trigger language plpgsql as $$
begin
  new.importado_em := now();
  new.importado_por := auth.uid();
  return new;
end $$;
drop trigger if exists consumo_aplicacao_toca on public.consumo_aplicacao;
create trigger consumo_aplicacao_toca before insert or update on public.consumo_aplicacao
  for each row execute function public.consumo_aplicacao_toca();

alter table public.consumo_aplicacao enable row level security;
grant select, insert, update, delete on public.consumo_aplicacao to authenticated;

drop policy if exists "leitura consumo aplicacao" on public.consumo_aplicacao;
create policy "leitura consumo aplicacao" on public.consumo_aplicacao
  for select using (auth.uid() is not null);

drop policy if exists "grava consumo aplicacao" on public.consumo_aplicacao;
create policy "grava consumo aplicacao" on public.consumo_aplicacao
  for insert with check (private.pode_lancar_cap(auth.uid()));

drop policy if exists "edita consumo aplicacao" on public.consumo_aplicacao;
create policy "edita consumo aplicacao" on public.consumo_aplicacao
  for update using (private.pode_lancar_cap(auth.uid()))
  with check (private.pode_lancar_cap(auth.uid()));

drop policy if exists "exclui consumo aplicacao" on public.consumo_aplicacao;
create policy "exclui consumo aplicacao" on public.consumo_aplicacao
  for delete using (private.pode_lancar_cap(auth.uid()));
