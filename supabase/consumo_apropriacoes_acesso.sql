-- Frotas (Apropriação e Aplicação): leitura com a mesma regra do Controle de CAP
-- (admin, supervisor ou operador avançado). Antes, qualquer usuário logado lia
-- a tabela consumo_apropriacoes. A gravação já era restrita a esse grupo
-- (private.pode_lancar_cap). Pode rodar de novo.

drop policy if exists "leitura consumo apropriacoes" on public.consumo_apropriacoes;
create policy "leitura consumo apropriacoes" on public.consumo_apropriacoes
  for select using (private.tema_liberado((select auth.uid()), 'cap'));
