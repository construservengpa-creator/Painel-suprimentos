-- Cotações: edição de preços já registrados (aplicado no projeto painel_suprimentos).
-- Leitura continua aberta, lançamento continua com private.pode_lancar_cotacao
-- e exclusão só com admin; a edição fica com admin, supervisor ou operador
-- avançado (mesmo grupo de private.pode_lancar_cap).

drop policy if exists "admin ou supervisor edita cotacao" on public.cotacoes;
drop policy if exists "admin supervisor ou operador avancado edita cotacao" on public.cotacoes;
create policy "admin supervisor ou operador avancado edita cotacao" on public.cotacoes
  for update
  using (private.pode_lancar_cap(auth.uid()))
  with check (private.pode_lancar_cap(auth.uid()));
