-- Créditos → pedido PAGO ANTECIPADAMENTE.
--
-- Alguns pedidos vinculados a um crédito já foram pagos de forma antecipada
-- (ex.: "COMPRA DE CAP (ANTECIPAÇÃO)"). Para esses, o valor pago conta
-- inteiro no crédito desde já (não fica "reservado"), e as notas fiscais que
-- forem chegando servem apenas para controlar o SALDO DE NOTA FISCAL a
-- receber do fornecedor — não alteram o saldo do crédito.
--
-- Marque/desmarque no formulário "Vincular Pedido" (editar vínculo).
-- Pode rodar de novo sem problema.

alter table public.creditos_vinculos
  add column if not exists pago_antecipado boolean not null default false;

-- Faz o PostgREST enxergar a coluna nova na hora.
notify pgrst, 'reload schema';
