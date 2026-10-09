-- Visão sienge_itens (lida pelo Jarvis): quantidades decimais gravadas sem a vírgula.
-- O relatório publicado guarda quantidades de dois jeitos: texto do Sienge no
-- formato brasileiro ("253,0000") e número JSON nas linhas que o painel
-- consolidou (237.13). jarvis_num(text) apaga todo ponto como separador de
-- milhar, então 237.13 virava 23713 (ex.: pedido 58822). A versão jsonb usa o
-- número JSON direto e só interpreta como formato brasileiro o que vier como texto,
-- igual ao parseNumBR do painel.

create or replace function public.jarvis_num(j jsonb)
returns numeric language sql immutable set search_path to 'public' as $$
  select case when jsonb_typeof(j) = 'number' then (j #>> '{}')::numeric
              else public.jarvis_num(j #>> '{}') end
$$;

create or replace view public.sienge_itens with (security_invoker = true) as
 SELECT r.importado_em,
    (e.value ->> 'obra'::text) AS obra,
    split_part((e.value ->> 'obra'::text), ' - '::text, 1) AS codigo_obra,
    (e.value ->> 'numSolicitacao'::text) AS num_solicitacao,
    jarvis_data((e.value ->> 'dataSolicitacao'::text)) AS data_solicitacao,
    (e.value ->> 'situacaoSolicitacao'::text) AS situacao_solicitacao,
    (e.value ->> 'solicitante'::text) AS solicitante,
    (e.value ->> 'alcadaSolicitacao'::text) AS alcada_solicitacao,
    jarvis_data((e.value ->> 'dataAutorizacaoSolicitacao'::text)) AS data_autorizacao_solicitacao,
    (e.value ->> 'numPedido'::text) AS num_pedido,
    jarvis_data((e.value ->> 'dataPedido'::text)) AS data_pedido,
    (e.value ->> 'situacaoPedido'::text) AS situacao_pedido,
    (e.value ->> 'alcadaPedido'::text) AS alcada_pedido,
    (e.value ->> 'situacaoAutorizacaoPedido'::text) AS situacao_autorizacao_pedido,
    (e.value ->> 'situacaoAutorizacaoItem'::text) AS situacao_autorizacao_item,
    jarvis_data((e.value ->> 'dataAutorizacaoPedido'::text)) AS data_autorizacao_pedido,
    (e.value ->> 'comprador'::text) AS comprador,
    (e.value ->> 'compradorDistribuido'::text) AS comprador_distribuido,
    (e.value ->> 'fornecedor'::text) AS fornecedor,
    (e.value ->> 'grupoInsumo'::text) AS grupo_insumo,
    (e.value ->> 'descricaoInsumo'::text) AS descricao_insumo,
    (e.value ->> 'detalhe'::text) AS detalhe,
    (e.value ->> 'marca'::text) AS marca,
    (e.value ->> 'unidadeMovimento'::text) AS unidade,
    jarvis_num((e.value -> 'qtdSolicitada'::text)) AS qtd_solicitada,
    jarvis_num((e.value -> 'qtdEntregue'::text)) AS qtd_entregue,
    jarvis_num((e.value -> 'saldo'::text)) AS saldo,
    jarvis_data((e.value ->> 'previsaoEntrega'::text)) AS previsao_entrega,
    jarvis_data((e.value ->> 'dataChegadaObra'::text)) AS data_chegada_obra,
    jarvis_data((e.value ->> 'dataEntregaObra'::text)) AS data_entrega_obra,
    (e.value ->> 'numNotaFiscal'::text) AS num_nota_fiscal,
    jarvis_data((e.value ->> 'dataNotaFiscal'::text)) AS data_nota_fiscal,
    jarvis_num((e.value -> 'valorNota'::text)) AS valor_nota,
    (e.value ->> 'chaveNFe'::text) AS chave_nfe,
    (e.value ->> 'anexoNotaFiscal'::text) AS anexo_nota_fiscal,
    (e.value ->> 'situacaoPagamento'::text) AS situacao_pagamento,
    jarvis_num((e.value -> 'numParcelas'::text)) AS num_parcelas
   FROM (relatorio_importacoes r
     CROSS JOIN LATERAL jsonb_array_elements(r.dados) e(value))
  WHERE (NOT (r.lote IS DISTINCT FROM ( SELECT relatorio_importacoes.lote
           FROM relatorio_importacoes
          ORDER BY relatorio_importacoes.importado_em DESC
         LIMIT 1)));
