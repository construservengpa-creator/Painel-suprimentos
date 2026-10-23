-- Devolução do saldo do pedido de CAP pelo fornecedor: quando o fornecedor
-- não vai entregar o restante do pedido e devolve o valor correspondente,
-- o painel registra aqui a quantidade e o valor abatidos, zerando o saldo
-- do pedido (que passa a contar como concluído e sai do relatório).
--
-- Colunas opcionais em cap_pedidos; pedidos sem devolução ficam com null.
-- As políticas de acesso de cap_pedidos continuam valendo.

alter table public.cap_pedidos
  add column if not exists saldo_dev_qtd   numeric,
  add column if not exists saldo_dev_valor numeric,
  add column if not exists saldo_dev_data  date,
  add column if not exists saldo_dev_obs   text;
