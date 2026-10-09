-- Cotações: edição de preços já registrados (aplicado no projeto painel_suprimentos).
-- Leitura continua aberta, lançamento continua com private.pode_lancar_cotacao
-- e exclusão só com admin; a edição fica com admin ou supervisor, a mesma
-- regra do Controle de Crédito.

drop policy if exists "admin ou supervisor edita cotacao" on public.cotacoes;
create policy "admin ou supervisor edita cotacao" on public.cotacoes
  for update
  using (private.is_gestor_credito(auth.uid()))
  with check (private.is_gestor_credito(auth.uid()));
