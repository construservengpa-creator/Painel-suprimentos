-- Cotação de preços (certame): fornecedores, processos, itens, convites e respostas.
-- Aplicado no projeto painel_suprimentos (xuukjnpkltvgzjfgivnd).
--
-- Fluxo: o comprador monta o certame com os insumos das solicitações pendentes,
-- convida fornecedores (mensagem pelo WhatsApp com um link exclusivo por
-- fornecedor), o fornecedor abre o link (cotacao.html?t=<token>) e responde os
-- preços, o painel monta o mapa comparativo e o comprador indica o vencedor.
--
-- Permissões no painel:
--   leitura                -> qualquer usuário logado (tema "cotacoes")
--   criar / editar         -> private.pode_lancar_cotacao (admin, supervisor, operador, operador avançado)
--   excluir certame        -> admin ou supervisor, ou quem criou enquanto for rascunho
-- O fornecedor NÃO tem login: ele só chega nos dados pelas funções
-- cotacao_portal_* abaixo, com o token do convite (uuid aleatório), e só vê
-- o próprio convite — nunca os preços dos concorrentes.

create table if not exists public.cotacao_fornecedores (
  id          bigserial primary key,
  nome        text not null,
  cnpj        text,
  contato     text,
  telefone    text not null,          -- WhatsApp, só dígitos com DDI (ex.: 5591999999999)
  email       text,
  cidade      text,
  insumos     text,                   -- o que costuma fornecer (ajuda a escolher quem convidar)
  observacao  text,
  ativo       boolean not null default true,
  criado_por  uuid default auth.uid(),
  criado_em   timestamptz not null default now()
);

create table if not exists public.cotacao_processos (
  id                  bigserial primary key,
  titulo              text not null,
  localidade_entrega  text,
  comprador_nome      text,
  comprador_telefone  text,           -- WhatsApp do comprador (o fornecedor pode avisar que respondeu)
  prazo_resposta      timestamptz,
  criterio            text not null default 'item' check (criterio in ('item','global')),
  status              text not null default 'rascunho'
                        check (status in ('rascunho','em_cotacao','em_analise','concluida','cancelada')),
  observacao          text,           -- aparece para o fornecedor
  vencedor_convite_id bigint,         -- vencedor do lote (critério global)
  justificativa       text,           -- por que o vencedor não é o menor preço, quando for o caso
  concluido_em        timestamptz,
  concluido_por       uuid,
  criado_por          uuid default auth.uid(),
  criado_em           timestamptz not null default now()
);

create table if not exists public.cotacao_itens (
  id                  bigserial primary key,
  processo_id         bigint not null references public.cotacao_processos(id) on delete cascade,
  ordem               integer not null default 0,
  num_solicitacao     text,
  obra                text,
  insumo              text not null,
  detalhe             text,
  unidade             text,
  quantidade          numeric not null default 1 check (quantidade > 0),
  vencedor_convite_id bigint,         -- vencedor do item (critério por item)
  justificativa       text
);
create index if not exists cotacao_itens_processo_idx on public.cotacao_itens(processo_id);

create table if not exists public.cotacao_convites (
  id                 bigserial primary key,
  processo_id        bigint not null references public.cotacao_processos(id) on delete cascade,
  fornecedor_id      bigint not null references public.cotacao_fornecedores(id),
  token              uuid not null default gen_random_uuid() unique,
  status             text not null default 'pendente'
                       check (status in ('pendente','enviado','respondido','declinou')),
  enviado_em         timestamptz,
  respondido_em      timestamptz,
  respondido_via     text check (respondido_via in ('link','manual')),
  condicao_pagamento text,
  prazo_entrega      text,
  validade_proposta  date,
  frete_total        numeric not null default 0 check (frete_total >= 0),
  observacao         text,
  editado_em         timestamptz,     -- última correção feita pelo comprador no painel
  editado_por        uuid,
  editado_por_nome   text,
  unique (processo_id, fornecedor_id)
);
-- bancos criados antes destas colunas
alter table public.cotacao_convites add column if not exists editado_em timestamptz;
alter table public.cotacao_convites add column if not exists editado_por uuid;
alter table public.cotacao_convites add column if not exists editado_por_nome text;
create index if not exists cotacao_convites_processo_idx on public.cotacao_convites(processo_id);

create table if not exists public.cotacao_respostas (
  id             bigserial primary key,
  convite_id     bigint not null references public.cotacao_convites(id) on delete cascade,
  item_id        bigint not null references public.cotacao_itens(id) on delete cascade,
  valor_unitario numeric check (valor_unitario is null or valor_unitario >= 0),
  marca          text,
  observacao     text,
  disponivel     boolean not null default true,
  atualizado_em  timestamptz not null default now(),
  unique (convite_id, item_id)
);
create index if not exists cotacao_respostas_item_idx on public.cotacao_respostas(item_id);

alter table public.cotacao_processos
  drop constraint if exists cotacao_processos_vencedor_fk,
  add constraint cotacao_processos_vencedor_fk foreign key (vencedor_convite_id)
    references public.cotacao_convites(id) on delete set null;
alter table public.cotacao_itens
  drop constraint if exists cotacao_itens_vencedor_fk,
  add constraint cotacao_itens_vencedor_fk foreign key (vencedor_convite_id)
    references public.cotacao_convites(id) on delete set null;

-- ---------- RLS ----------
alter table public.cotacao_fornecedores enable row level security;
alter table public.cotacao_processos    enable row level security;
alter table public.cotacao_itens        enable row level security;
alter table public.cotacao_convites     enable row level security;
alter table public.cotacao_respostas    enable row level security;

do $$
declare t text;
begin
  foreach t in array array['cotacao_fornecedores','cotacao_processos','cotacao_itens','cotacao_convites','cotacao_respostas'] loop
    execute format('drop policy if exists "logado le %1$s" on public.%1$I', t);
    execute format('create policy "logado le %1$s" on public.%1$I for select to authenticated using (private.tema_liberado(auth.uid(), ''cotacoes''))', t);
    execute format('drop policy if exists "lancador insere %1$s" on public.%1$I', t);
    execute format('create policy "lancador insere %1$s" on public.%1$I for insert to authenticated with check (private.pode_lancar_cotacao(auth.uid()))', t);
    execute format('drop policy if exists "lancador edita %1$s" on public.%1$I', t);
    execute format('create policy "lancador edita %1$s" on public.%1$I for update to authenticated using (private.pode_lancar_cotacao(auth.uid())) with check (private.pode_lancar_cotacao(auth.uid()))', t);
  end loop;
end $$;

-- exclusão: itens/convites/respostas de quem pode lançar (montagem do certame);
-- certame inteiro só admin/supervisor, ou o autor enquanto for rascunho;
-- fornecedor do cadastro só admin/supervisor (os demais podem inativar).
drop policy if exists "lancador exclui cotacao_itens" on public.cotacao_itens;
create policy "lancador exclui cotacao_itens" on public.cotacao_itens for delete to authenticated
  using (private.pode_lancar_cotacao(auth.uid()));
drop policy if exists "lancador exclui cotacao_convites" on public.cotacao_convites;
create policy "lancador exclui cotacao_convites" on public.cotacao_convites for delete to authenticated
  using (private.pode_lancar_cotacao(auth.uid()));
drop policy if exists "lancador exclui cotacao_respostas" on public.cotacao_respostas;
create policy "lancador exclui cotacao_respostas" on public.cotacao_respostas for delete to authenticated
  using (private.pode_lancar_cotacao(auth.uid()));
drop policy if exists "gestor ou autor exclui cotacao_processos" on public.cotacao_processos;
create policy "gestor ou autor exclui cotacao_processos" on public.cotacao_processos for delete to authenticated
  using (private.is_gestor_credito(auth.uid())
         or (criado_por = auth.uid() and status = 'rascunho' and private.pode_lancar_cotacao(auth.uid())));
drop policy if exists "gestor exclui cotacao_fornecedores" on public.cotacao_fornecedores;
create policy "gestor exclui cotacao_fornecedores" on public.cotacao_fornecedores for delete to authenticated
  using (private.is_gestor_credito(auth.uid()));

-- ---------- portal do fornecedor (sem login, pelo token do convite) ----------
create or replace function public.cotacao_portal_obter(p_token uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  c  public.cotacao_convites%rowtype;
  p  public.cotacao_processos%rowtype;
  f  public.cotacao_fornecedores%rowtype;
begin
  select * into c from public.cotacao_convites where token = p_token;
  if not found then return jsonb_build_object('erro', 'Convite não encontrado. Confira o link recebido.'); end if;
  select * into p from public.cotacao_processos where id = c.processo_id;
  select * into f from public.cotacao_fornecedores where id = c.fornecedor_id;
  return jsonb_build_object(
    'processo', jsonb_build_object(
      'numero', p.id, 'titulo', p.titulo, 'localidade', p.localidade_entrega,
      'prazo', p.prazo_resposta, 'observacao', p.observacao, 'status', p.status,
      'comprador_nome', p.comprador_nome, 'comprador_telefone', p.comprador_telefone,
      'aberto', p.status = 'em_cotacao' and (p.prazo_resposta is null or now() <= p.prazo_resposta)),
    'fornecedor', jsonb_build_object('nome', f.nome),
    'convite', jsonb_build_object(
      'status', c.status, 'respondido_em', c.respondido_em,
      'condicao_pagamento', c.condicao_pagamento, 'prazo_entrega', c.prazo_entrega,
      'validade_proposta', c.validade_proposta, 'frete_total', c.frete_total, 'observacao', c.observacao),
    'itens', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', i.id, 'insumo', i.insumo, 'detalhe', i.detalhe, 'unidade', i.unidade,
               'quantidade', i.quantidade,
               'valor_unitario', r.valor_unitario, 'marca', r.marca,
               'observacao', r.observacao, 'disponivel', coalesce(r.disponivel, true))
             order by i.ordem, i.id)
        from public.cotacao_itens i
        left join public.cotacao_respostas r on r.item_id = i.id and r.convite_id = c.id
       where i.processo_id = p.id), '[]'::jsonb)
  );
end $$;

-- p_dados: { condicao_pagamento, prazo_entrega, validade_proposta (aaaa-mm-dd), frete_total, observacao,
--            declinar (bool), itens: [{ id, valor_unitario, marca, observacao, disponivel }] }
create or replace function public.cotacao_portal_responder(p_token uuid, p_dados jsonb)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  c  public.cotacao_convites%rowtype;
  p  public.cotacao_processos%rowtype;
  it jsonb;
  v_item bigint;
  v_valor numeric;
  v_disp boolean;
  v_validade date;
  v_frete numeric;
  v_qtd int := 0;
begin
  select * into c from public.cotacao_convites where token = p_token for update;
  if not found then return jsonb_build_object('erro', 'Convite não encontrado.'); end if;
  select * into p from public.cotacao_processos where id = c.processo_id;
  if p.status <> 'em_cotacao' or (p.prazo_resposta is not null and now() > p.prazo_resposta) then
    return jsonb_build_object('erro', 'Esta cotação não está mais recebendo propostas.');
  end if;

  if coalesce((p_dados->>'declinar')::boolean, false) then
    update public.cotacao_convites
       set status = 'declinou', respondido_em = now(), respondido_via = 'link',
           observacao = left(nullif(btrim(p_dados->>'observacao'), ''), 1000)
     where id = c.id;
    return jsonb_build_object('ok', true, 'declinou', true);
  end if;

  begin
    v_validade := nullif(p_dados->>'validade_proposta', '')::date;
  exception when others then v_validade := null;
  end;
  -- condições comerciais obrigatórias (o mapa comparativo precisa delas)
  if nullif(btrim(p_dados->>'prazo_entrega'), '') is null then
    return jsonb_build_object('erro', 'Informe o prazo de entrega.');
  end if;
  if nullif(btrim(p_dados->>'condicao_pagamento'), '') is null then
    return jsonb_build_object('erro', 'Informe a condição de pagamento.');
  end if;
  if v_validade is null then
    return jsonb_build_object('erro', 'Informe a validade da proposta.');
  end if;
  if v_validade < current_date then
    return jsonb_build_object('erro', 'A validade da proposta não pode ser anterior a hoje.');
  end if;
  begin
    v_frete := greatest(coalesce(nullif(p_dados->>'frete_total', '')::numeric, 0), 0);
  exception when others then
    return jsonb_build_object('erro', 'Valor de frete inválido.');
  end;

  -- 1ª passada: só valida (nada é gravado se houver erro)
  for it in select * from jsonb_array_elements(coalesce(p_dados->'itens', '[]'::jsonb)) loop
    begin
      v_valor := nullif(it->>'valor_unitario', '')::numeric;
    exception when others then
      return jsonb_build_object('erro', 'Há um preço com formato inválido.');
    end;
    if v_valor is not null and v_valor < 0 then
      return jsonb_build_object('erro', 'Preço não pode ser negativo.');
    end if;
    if v_valor is not null and coalesce((it->>'disponivel')::boolean, true)
       and exists (select 1 from public.cotacao_itens where id = nullif(it->>'id', '')::bigint and processo_id = p.id) then
      v_qtd := v_qtd + 1;
    end if;
  end loop;
  if v_qtd = 0 then
    return jsonb_build_object('erro', 'Informe o preço de pelo menos um item (ou use "Não vou cotar").');
  end if;

  -- 2ª passada: grava
  for it in select * from jsonb_array_elements(coalesce(p_dados->'itens', '[]'::jsonb)) loop
    v_item := nullif(it->>'id', '')::bigint;
    if not exists (select 1 from public.cotacao_itens where id = v_item and processo_id = p.id) then
      continue;
    end if;
    v_disp := coalesce((it->>'disponivel')::boolean, true);
    begin
      v_valor := nullif(it->>'valor_unitario', '')::numeric;
    exception when others then
      return jsonb_build_object('erro', 'Há um preço com formato inválido.');
    end;
    if v_valor is not null and v_valor < 0 then
      return jsonb_build_object('erro', 'Preço não pode ser negativo.');
    end if;
    if not v_disp then v_valor := null; end if;
    insert into public.cotacao_respostas (convite_id, item_id, valor_unitario, marca, observacao, disponivel, atualizado_em)
    values (c.id, v_item, v_valor, left(nullif(btrim(it->>'marca'), ''), 200),
            left(nullif(btrim(it->>'observacao'), ''), 500), v_disp, now())
    on conflict (convite_id, item_id) do update
      set valor_unitario = excluded.valor_unitario, marca = excluded.marca,
          observacao = excluded.observacao, disponivel = excluded.disponivel, atualizado_em = now();
  end loop;

  update public.cotacao_convites
     set status = 'respondido', respondido_em = now(), respondido_via = 'link',
         condicao_pagamento = left(nullif(btrim(p_dados->>'condicao_pagamento'), ''), 300),
         prazo_entrega      = left(nullif(btrim(p_dados->>'prazo_entrega'), ''), 300),
         validade_proposta  = v_validade,
         frete_total        = v_frete,
         observacao         = left(nullif(btrim(p_dados->>'observacao'), ''), 1000)
   where id = c.id;
  return jsonb_build_object('ok', true, 'itens_cotados', v_qtd);
end $$;

revoke all on function public.cotacao_portal_obter(uuid) from public;
revoke all on function public.cotacao_portal_responder(uuid, jsonb) from public;
grant execute on function public.cotacao_portal_obter(uuid) to anon, authenticated;
grant execute on function public.cotacao_portal_responder(uuid, jsonb) to anon, authenticated;

-- o painel atualiza sozinho quando um fornecedor responde
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin alter publication supabase_realtime add table public.cotacao_convites; exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.cotacao_respostas; exception when duplicate_object then null; end;
  end if;
end $$;
