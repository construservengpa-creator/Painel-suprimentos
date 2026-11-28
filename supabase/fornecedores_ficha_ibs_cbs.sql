-- Ficha cadastral do fornecedor com as informações tributárias do IBS e da CBS
-- (reforma tributária do consumo — EC 132/2023 e LC 214/2025).
-- Projeto painel_suprimentos (xuukjnpkltvgzjfgivnd). Rodar DEPOIS de cotacao_certame.sql e cotacao_ibs_cbs.sql.
--
-- O que faz (só acrescenta; nada é apagado):
--   1. Novas colunas em cotacao_fornecedores (identificação fiscal, endereço com código IBGE,
--      regime de IBS/CBS, tratamento tributário, CST/cClassTrib, dados de pagamento e declaração).
--   2. ficha_token: link exclusivo (cadastro-fornecedor.html?t=<token>) para o próprio fornecedor
--      preencher a ficha pelo WhatsApp, sem login.
--   3. Funções fornecedor_ficha_obter / fornecedor_ficha_salvar (security definer, liberadas ao anon):
--      o fornecedor só lê e grava a PRÓPRIA ficha, pelo token.
--   4. cotacao_portal_obter passa a devolver o regime e as alíquotas usuais da ficha, para o link da
--      cotação já vir preenchido.
--
-- regime_ibs_cbs:
--   regular          → Lucro Real / Presumido / Arbitrado: IBS/CBS destacados por fora do preço, crédito integral
--   simples          → Simples Nacional / MEI recolhendo IBS/CBS dentro do DAS
--   simples_por_fora → Simples Nacional que optou pelo regime regular de IBS/CBS (art. 41 da LC 214/2025)
--   nao_contribuinte → produtor rural ou nanoempreendedor não contribuinte, pessoa física etc.

alter table public.cotacao_fornecedores
  add column if not exists tipo_pessoa            text not null default 'pj',
  add column if not exists nome_fantasia          text,
  add column if not exists inscricao_estadual     text,
  add column if not exists inscricao_municipal    text,
  add column if not exists cnae_principal         text,
  add column if not exists cep                    text,
  add column if not exists logradouro             text,
  add column if not exists numero                 text,
  add column if not exists complemento            text,
  add column if not exists bairro                 text,
  add column if not exists uf                     text,
  add column if not exists municipio_ibge         text,      -- 7 dígitos; define o município/UF do IBS
  add column if not exists email_nfe              text,      -- e-mail que envia o XML das notas
  add column if not exists contador_nome          text,
  add column if not exists contador_contato       text,
  add column if not exists regime_federal         text,
  add column if not exists regime_ibs_cbs         text,
  add column if not exists opcao_regular_periodo  text,      -- semestre da opção do Simples pelo IBS/CBS por fora
  add column if not exists tratamento_ibs_cbs     text,
  add column if not exists aliq_cbs_padrao        numeric,
  add column if not exists aliq_ibs_padrao        numeric,
  add column if not exists cst_ibs_cbs            text,
  add column if not exists cclasstrib             text,
  add column if not exists ncm_nbs                text,
  add column if not exists documento_fiscal       text,
  add column if not exists obs_tributaria         text,
  add column if not exists banco                  text,
  add column if not exists agencia                text,
  add column if not exists conta                  text,
  add column if not exists pix_chave              text,
  add column if not exists declarante_nome        text,
  add column if not exists declarante_cargo       text,
  add column if not exists declaracao_aceita      boolean not null default false,
  add column if not exists ficha_token            uuid not null default gen_random_uuid(),
  add column if not exists ficha_atualizada_em    timestamptz,
  add column if not exists ficha_atualizada_via   text,
  add column if not exists ficha_atualizada_por_nome text;

create unique index if not exists cotacao_fornecedores_ficha_token_uk on public.cotacao_fornecedores(ficha_token);

alter table public.cotacao_fornecedores drop constraint if exists cotacao_fornecedores_ficha_ck;
alter table public.cotacao_fornecedores add constraint cotacao_fornecedores_ficha_ck check (
      tipo_pessoa in ('pj', 'pf')
  and (regime_federal is null or regime_federal in ('lucro_real', 'lucro_presumido', 'lucro_arbitrado', 'simples', 'mei', 'produtor_rural', 'pessoa_fisica', 'outro'))
  and (regime_ibs_cbs is null or regime_ibs_cbs in ('regular', 'simples', 'simples_por_fora', 'nao_contribuinte'))
  and (tratamento_ibs_cbs is null or tratamento_ibs_cbs in ('padrao', 'reducao_30', 'reducao_60', 'aliquota_zero', 'isencao', 'monofasico', 'especifico_outro', 'varios'))
  and (documento_fiscal is null or documento_fiscal in ('nfe', 'nfse', 'ambos', 'nfce', 'outro'))
  and (aliq_cbs_padrao is null or aliq_cbs_padrao between 0 and 100)
  and (aliq_ibs_padrao is null or aliq_ibs_padrao between 0 and 100)
  and (uf is null or uf ~ '^[A-Z]{2}$')
  and (municipio_ibge is null or municipio_ibge ~ '^[0-9]{7}$')
  and (ficha_atualizada_via is null or ficha_atualizada_via in ('link', 'painel'))
);

-- ---------- link do fornecedor: ler a própria ficha ----------
create or replace function public.fornecedor_ficha_obter(p_token uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare f public.cotacao_fornecedores%rowtype;
begin
  select * into f from public.cotacao_fornecedores where ficha_token = p_token;
  if not found then return jsonb_build_object('erro', 'Ficha não encontrada. Confira o link recebido.'); end if;
  if not f.ativo then return jsonb_build_object('erro', 'Este cadastro está inativo. Fale com o comprador.'); end if;
  -- só os campos da ficha (nada de observações internas nem de quem cadastrou)
  return jsonb_build_object('fornecedor', jsonb_build_object(
    'nome', f.nome, 'nome_fantasia', f.nome_fantasia, 'tipo_pessoa', f.tipo_pessoa, 'cnpj', f.cnpj,
    'inscricao_estadual', f.inscricao_estadual, 'inscricao_municipal', f.inscricao_municipal, 'cnae_principal', f.cnae_principal,
    'cep', f.cep, 'logradouro', f.logradouro, 'numero', f.numero, 'complemento', f.complemento, 'bairro', f.bairro,
    'cidade', f.cidade, 'uf', f.uf, 'municipio_ibge', f.municipio_ibge,
    'contato', f.contato, 'telefone', f.telefone, 'email', f.email, 'email_nfe', f.email_nfe,
    'contador_nome', f.contador_nome, 'contador_contato', f.contador_contato,
    'regime_federal', f.regime_federal, 'regime_ibs_cbs', f.regime_ibs_cbs, 'opcao_regular_periodo', f.opcao_regular_periodo,
    'tratamento_ibs_cbs', f.tratamento_ibs_cbs, 'aliq_cbs_padrao', f.aliq_cbs_padrao, 'aliq_ibs_padrao', f.aliq_ibs_padrao,
    'cst_ibs_cbs', f.cst_ibs_cbs, 'cclasstrib', f.cclasstrib, 'ncm_nbs', f.ncm_nbs, 'documento_fiscal', f.documento_fiscal,
    'obs_tributaria', f.obs_tributaria, 'banco', f.banco, 'agencia', f.agencia, 'conta', f.conta, 'pix_chave', f.pix_chave,
    'declarante_nome', f.declarante_nome, 'declarante_cargo', f.declarante_cargo, 'declaracao_aceita', f.declaracao_aceita,
    'ficha_atualizada_em', f.ficha_atualizada_em));
end $$;

-- ---------- link do fornecedor: gravar a própria ficha ----------
-- p_dados: os mesmos campos devolvidos por fornecedor_ficha_obter (menos ficha_atualizada_em).
create or replace function public.fornecedor_ficha_salvar(p_token uuid, p_dados jsonb)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  f      public.cotacao_fornecedores%rowtype;
  v_fone text;
  v_doc  text;
  v_cbs  numeric;
  v_ibs  numeric;
begin
  select * into f from public.cotacao_fornecedores where ficha_token = p_token for update;
  if not found then return jsonb_build_object('erro', 'Ficha não encontrada. Confira o link recebido.'); end if;
  if not f.ativo then return jsonb_build_object('erro', 'Este cadastro está inativo. Fale com o comprador.'); end if;

  v_fone := regexp_replace(coalesce(p_dados->>'telefone', ''), '\D', '', 'g');
  if length(v_fone) in (10, 11) then v_fone := '55' || v_fone; end if;
  if length(v_fone) < 12 then return jsonb_build_object('erro', 'Informe o WhatsApp com DDD.'); end if;
  v_doc := regexp_replace(coalesce(p_dados->>'cnpj', ''), '\D', '', 'g');
  if length(v_doc) not in (11, 14) then return jsonb_build_object('erro', 'Informe um CNPJ (14 dígitos) ou CPF (11 dígitos).'); end if;
  if nullif(btrim(p_dados->>'nome'), '') is null then return jsonb_build_object('erro', 'Informe a razão social.'); end if;
  if nullif(p_dados->>'regime_federal', '') is null or nullif(p_dados->>'regime_ibs_cbs', '') is null then
    return jsonb_build_object('erro', 'Informe o regime tributário e o enquadramento no IBS/CBS.');
  end if;
  if nullif(btrim(p_dados->>'cidade'), '') is null or nullif(btrim(p_dados->>'uf'), '') is null then
    return jsonb_build_object('erro', 'Informe o município e a UF.');
  end if;
  if not coalesce((p_dados->>'declaracao_aceita')::boolean, false) or nullif(btrim(p_dados->>'declarante_nome'), '') is null then
    return jsonb_build_object('erro', 'Confirme a declaração e informe o nome de quem preencheu.');
  end if;
  begin
    v_cbs := nullif(replace(p_dados->>'aliq_cbs_padrao', ',', '.'), '')::numeric;
    v_ibs := nullif(replace(p_dados->>'aliq_ibs_padrao', ',', '.'), '')::numeric;
  exception when others then
    return jsonb_build_object('erro', 'Alíquota de CBS ou IBS com formato inválido.');
  end;

  begin
    update public.cotacao_fornecedores set
      nome                  = left(btrim(p_dados->>'nome'), 200),
      nome_fantasia         = left(nullif(btrim(p_dados->>'nome_fantasia'), ''), 200),
      tipo_pessoa           = case when length(v_doc) = 11 then 'pf' else 'pj' end,
      cnpj                  = v_doc,
      inscricao_estadual    = left(nullif(btrim(p_dados->>'inscricao_estadual'), ''), 30),
      inscricao_municipal   = left(nullif(btrim(p_dados->>'inscricao_municipal'), ''), 30),
      cnae_principal        = left(nullif(btrim(p_dados->>'cnae_principal'), ''), 20),
      cep                   = left(nullif(regexp_replace(coalesce(p_dados->>'cep', ''), '\D', '', 'g'), ''), 8),
      logradouro            = left(nullif(btrim(p_dados->>'logradouro'), ''), 200),
      numero                = left(nullif(btrim(p_dados->>'numero'), ''), 20),
      complemento           = left(nullif(btrim(p_dados->>'complemento'), ''), 100),
      bairro                = left(nullif(btrim(p_dados->>'bairro'), ''), 100),
      cidade                = left(btrim(p_dados->>'cidade'), 100),
      uf                    = upper(left(btrim(p_dados->>'uf'), 2)),
      municipio_ibge        = nullif(regexp_replace(coalesce(p_dados->>'municipio_ibge', ''), '\D', '', 'g'), ''),
      contato               = left(nullif(btrim(p_dados->>'contato'), ''), 120),
      telefone              = v_fone,
      email                 = left(nullif(btrim(p_dados->>'email'), ''), 200),
      email_nfe             = left(nullif(btrim(p_dados->>'email_nfe'), ''), 200),
      contador_nome         = left(nullif(btrim(p_dados->>'contador_nome'), ''), 120),
      contador_contato      = left(nullif(btrim(p_dados->>'contador_contato'), ''), 200),
      regime_federal        = p_dados->>'regime_federal',
      regime_ibs_cbs        = p_dados->>'regime_ibs_cbs',
      opcao_regular_periodo = case when p_dados->>'regime_ibs_cbs' = 'simples_por_fora'
                                   then left(nullif(btrim(p_dados->>'opcao_regular_periodo'), ''), 60) end,
      tratamento_ibs_cbs    = nullif(p_dados->>'tratamento_ibs_cbs', ''),
      aliq_cbs_padrao       = v_cbs,
      aliq_ibs_padrao       = v_ibs,
      cst_ibs_cbs           = left(nullif(regexp_replace(coalesce(p_dados->>'cst_ibs_cbs', ''), '\D', '', 'g'), ''), 3),
      cclasstrib            = left(nullif(regexp_replace(coalesce(p_dados->>'cclasstrib', ''), '\D', '', 'g'), ''), 6),
      ncm_nbs               = left(nullif(btrim(p_dados->>'ncm_nbs'), ''), 500),
      documento_fiscal      = nullif(p_dados->>'documento_fiscal', ''),
      obs_tributaria        = left(nullif(btrim(p_dados->>'obs_tributaria'), ''), 1500),
      banco                 = left(nullif(btrim(p_dados->>'banco'), ''), 100),
      agencia               = left(nullif(btrim(p_dados->>'agencia'), ''), 20),
      conta                 = left(nullif(btrim(p_dados->>'conta'), ''), 30),
      pix_chave             = left(nullif(btrim(p_dados->>'pix_chave'), ''), 120),
      declarante_nome       = left(btrim(p_dados->>'declarante_nome'), 120),
      declarante_cargo      = left(nullif(btrim(p_dados->>'declarante_cargo'), ''), 80),
      declaracao_aceita     = true,
      ficha_atualizada_em   = now(),
      ficha_atualizada_via  = 'link',
      ficha_atualizada_por_nome = left(btrim(p_dados->>'declarante_nome'), 120)
    where id = f.id;
  exception when check_violation then
    return jsonb_build_object('erro', 'Algum campo está fora do padrão (UF com 2 letras, código IBGE com 7 dígitos, alíquotas entre 0 e 100). Confira e envie de novo.');
  end;
  return jsonb_build_object('ok', true);
end $$;

revoke all on function public.fornecedor_ficha_obter(uuid) from public;
revoke all on function public.fornecedor_ficha_salvar(uuid, jsonb) from public;
grant execute on function public.fornecedor_ficha_obter(uuid) to anon, authenticated;
grant execute on function public.fornecedor_ficha_salvar(uuid, jsonb) to anon, authenticated;

-- ---------- link da cotação: já vem com o regime e as alíquotas da ficha ----------
-- Igual à versão de cotacao_ibs_cbs.sql; só acrescenta regime_ibs_cbs / aliq_*_padrao em "fornecedor".
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
    'fornecedor', jsonb_build_object('nome', f.nome, 'regime_ibs_cbs', f.regime_ibs_cbs,
      'aliq_cbs_padrao', f.aliq_cbs_padrao, 'aliq_ibs_padrao', f.aliq_ibs_padrao),
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
