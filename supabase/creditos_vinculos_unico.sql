-- Créditos: um pedido de compra só pode ter um vínculo ativo (não cancelado).
-- Vincular o mesmo pedido duas vezes abateria o mesmo valor duas vezes do
-- crédito. Vínculo cancelado não conta, então o pedido pode ser vinculado
-- de novo depois de cancelar o anterior.
--
-- 1) Antes de criar o índice, confira se há duplicatas (o índice falha se houver):
--
--   select num_pedido, id, credito_id, data_vinculo, status
--     from public.creditos_vinculos
--    where status <> 'cancelado'
--      and num_pedido in (select num_pedido from public.creditos_vinculos
--                          where status <> 'cancelado'
--                          group by num_pedido having count(*) > 1)
--    order by num_pedido, data_vinculo;
--
--   Cancele ou exclua o vínculo excedente pela tela (ou por SQL) e rode de novo.
--
-- 2) Cria a regra:

create unique index if not exists creditos_vinculos_pedido_ativo_unico
  on public.creditos_vinculos (num_pedido)
  where status <> 'cancelado';
