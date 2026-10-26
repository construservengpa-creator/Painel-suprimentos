-- Créditos → valor total de cada pedido de compra, do relatório
-- "Acompanhamento de Pedidos" do Sienge (coluna "Total do pedido"),
-- importado na aba Créditos. Guarda o total de TODOS os pedidos do
-- relatório (com ou sem nota fiscal), não só dos vinculados: é o que
-- preenche o "Valor a abater" ao escolher o pedido em "Vincular Pedido".
--
-- Mesmas regras de acesso das demais tabelas de crédito: só admin ou
-- supervisor (private.is_gestor_credito). Sem esta tabela o painel segue
-- sem o valor do pedido. Pode rodar de novo: recria as políticas.

create table if not exists public.creditos_pedidos_totais (
  num_pedido    text primary key,
  total_pedido  numeric(14,2) not null,
  arquivo       text,
  importado_por uuid default auth.uid(),
  importado_em  timestamptz not null default now()
);

alter table public.creditos_pedidos_totais enable row level security;

drop policy if exists "leitura totais de pedido" on public.creditos_pedidos_totais;
create policy "leitura totais de pedido" on public.creditos_pedidos_totais
  for select using (private.is_gestor_credito(auth.uid()));

drop policy if exists "grava totais de pedido" on public.creditos_pedidos_totais;
create policy "grava totais de pedido" on public.creditos_pedidos_totais
  for insert with check (private.is_gestor_credito(auth.uid()));

drop policy if exists "edita totais de pedido" on public.creditos_pedidos_totais;
create policy "edita totais de pedido" on public.creditos_pedidos_totais
  for update using (private.is_gestor_credito(auth.uid()))
  with check (private.is_gestor_credito(auth.uid()));

drop policy if exists "exclui totais de pedido" on public.creditos_pedidos_totais;
create policy "exclui totais de pedido" on public.creditos_pedidos_totais
  for delete using (private.is_gestor_credito(auth.uid()));
