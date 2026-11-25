-- Cotação de preços (certame): análise do IBS e da CBS (reforma tributária, LC 214/2025).
-- Aplicado no projeto painel_suprimentos (xuukjnpkltvgzjfgivnd).
--
-- O fornecedor informa no link o regime tributário e, por item, as alíquotas de
-- CBS e IBS. O painel compara as propostas pelo CUSTO LÍQUIDO:
--   regular / Simples com IBS/CBS por fora: nota = preço × (1 + t); crédito = preço × t × a
--   Simples (IBS/CBS dentro do DAS):        nota = preço;           crédito = preço × t × a
--   custo líquido = nota − crédito
-- com t = (CBS% + IBS%) / 100 e a = aproveitamento do crédito no certame (padrão 100%).
-- Só acrescenta colunas e substitui as duas funções do portal; nada é apagado.

alter table public.cotacao_processos add column if not exists credito_ibs_cbs_pct numeric not null default 100;
alter table public.cotacao_processos drop constraint if exists cotacao_processos_credito_pct_ck;
alter table public.cotacao_processos add constraint cotacao_processos_credito_pct_ck check (credito_ibs_cbs_pct between 0 and 100);

alter table public.cotacao_convites add column if not exists regime_tributario text;
alter table public.cotacao_convites drop constraint if exists cotacao_convites_regime_ck;
alter table public.cotacao_convites add constraint cotacao_convites_regime_ck
  check (regime_tributario is null or regime_tributario in ('regular', 'simples', 'simples_por_fora'));

alter table public.cotacao_respostas add column if not exists aliq_cbs numeric;
alter table public.cotacao_respostas add column if not exists aliq_ibs numeric;
alter table public.cotacao_respostas drop constraint if exists cotacao_respostas_aliq_ck;
alter table public.cotacao_respostas add constraint cotacao_respostas_aliq_ck
  check ((aliq_cbs is null or aliq_cbs between 0 and 100) and (aliq_ibs is null or aliq_ibs between 0 and 100));

-- ---------- portal do fornecedor ----------
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
      'validade_proposta', c.validade_proposta, 'frete_total', c.frete_total, 'observacao', c.observacao,
      'regime_tributario', c.regime_tributario),
    'itens', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', i.id, 'insumo', i.insumo, 'detalhe', i.detalhe, 'unidade', i.unidade,
               'quantidade', i.quantidade,
               'valor_unitario', r.valor_unitario, 'marca', r.marca,
               'aliq_cbs', r.aliq_cbs, 'aliq_ibs', r.aliq_ibs,
               'observacao', r.observacao, 'disponivel', coalesce(r.disponivel, true))
             order by i.ordem, i.id)
        from public.cotacao_itens i
        left join public.cotacao_respostas r on r.item_id = i.id and r.convite_id = c.id
       where i.processo_id = p.id), '[]'::jsonb)
  );
end $$;

-- p_dados: { condicao_pagamento, prazo_entrega, validade_proposta (aaaa-mm-dd), frete_total, observacao,
--            regime_tributario ('regular' | 'simples' | 'simples_por_fora'),
--            declinar (bool), itens: [{ id, valor_unitario, aliq_cbs, aliq_ibs, marca, observacao, disponivel }] }
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
  v_regime text;
  v_cbs numeric;
  v_ibs numeric;
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

  v_regime := nullif(btrim(p_dados->>'regime_tributario'), '');
  -- obrigatório no formulário do portal; aqui só valida o valor
  if v_regime is not null and v_regime not in ('regular', 'simples', 'simples_por_fora') then
    return jsonb_build_object('erro', 'Regime tributário inválido.');
  end if;

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
    begin
      v_cbs := nullif(it->>'aliq_cbs', '')::numeric;
      v_ibs := nullif(it->>'aliq_ibs', '')::numeric;
    exception when others then
      return jsonb_build_object('erro', 'Há uma alíquota de IBS/CBS com formato inválido.');
    end;
    if (v_cbs is not null and (v_cbs < 0 or v_cbs > 100)) or (v_ibs is not null and (v_ibs < 0 or v_ibs > 100)) then
      return jsonb_build_object('erro', 'As alíquotas de IBS e CBS devem ficar entre 0% e 100%.');
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
    v_cbs := nullif(it->>'aliq_cbs', '')::numeric;
    v_ibs := nullif(it->>'aliq_ibs', '')::numeric;
    if not v_disp then v_valor := null; v_cbs := null; v_ibs := null; end if;
    insert into public.cotacao_respostas (convite_id, item_id, valor_unitario, aliq_cbs, aliq_ibs, marca, observacao, disponivel, atualizado_em)
    values (c.id, v_item, v_valor, v_cbs, v_ibs, left(nullif(btrim(it->>'marca'), ''), 200),
            left(nullif(btrim(it->>'observacao'), ''), 500), v_disp, now())
    on conflict (convite_id, item_id) do update
      set valor_unitario = excluded.valor_unitario, aliq_cbs = excluded.aliq_cbs, aliq_ibs = excluded.aliq_ibs, marca = excluded.marca,
          observacao = excluded.observacao, disponivel = excluded.disponivel, atualizado_em = now();
  end loop;

  update public.cotacao_convites
     set status = 'respondido', respondido_em = now(), respondido_via = 'link',
         condicao_pagamento = left(nullif(btrim(p_dados->>'condicao_pagamento'), ''), 300),
         prazo_entrega      = left(nullif(btrim(p_dados->>'prazo_entrega'), ''), 300),
         validade_proposta  = v_validade,
         frete_total        = v_frete,
         regime_tributario  = coalesce(v_regime, regime_tributario),
         observacao         = left(nullif(btrim(p_dados->>'observacao'), ''), 1000)
   where id = c.id;
  return jsonb_build_object('ok', true, 'itens_cotados', v_qtd);
end $$;

revoke all on function public.cotacao_portal_obter(uuid) from public;
revoke all on function public.cotacao_portal_responder(uuid, jsonb) from public;
grant execute on function public.cotacao_portal_obter(uuid) to anon, authenticated;
grant execute on function public.cotacao_portal_responder(uuid, jsonb) to anon, authenticated;
