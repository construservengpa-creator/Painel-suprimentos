-- Créditos: um pedido de compra pode abater de VÁRIOS créditos.
--
-- Antes, um pedido só podia ter um vínculo ativo (índice
-- creditos_vinculos_pedido_ativo_unico, de creditos_vinculos_unico.sql).
-- Agora o painel divide o valor do pedido entre os créditos da mesma obra
-- quando ele não cabe no saldo de um só: um vínculo por crédito. As notas
-- fiscais do pedido são repartidas entre esses vínculos na proporção do
-- valor previsto de cada um, então o pedido continua sendo abatido uma
-- única vez no total.
--
-- A regra passa a ser: no máximo um vínculo ativo por pedido EM CADA crédito.

drop index if exists public.creditos_vinculos_pedido_ativo_unico;

create unique index if not exists creditos_vinculos_pedido_credito_ativo_unico
  on public.creditos_vinculos (num_pedido, credito_id)
  where status <> 'cancelado';
