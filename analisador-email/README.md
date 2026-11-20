# Analisador de Email

Módulo independente, publicado no Vercel, que lê a Caixa de Entrada do Outlook corporativo
(Microsoft 365) e mostra quais emails precisam da sua interação:

| Grupo | O que entra |
|---|---|
| Precisa da sua ação | pedidos para você fazer algo (comprar, aprovar, analisar, pagar…) |
| Esperando sua resposta | alguém espera uma resposta ou confirmação sua |
| Acompanhar | você está em cópia ou outra pessoa é a responsável agora |
| Você já respondeu | você enviou mensagem na conversa depois do último email recebido |
| Informativos | NF, boletos, faturas, avisos de sistema |
| Pode ignorar | propaganda, pesquisas, compras pessoais |

Cada email vem com resumo, próximo passo sugerido, prazo (quando houver) e link para abrir no Outlook.
O app **só lê** o email (permissão `Mail.Read`): não envia, apaga nem marca como lido.

## Como funciona

- `index.html` + `app.js`: login Microsoft (MSAL) no navegador e leitura do email direto no Microsoft Graph.
  As conversas são agrupadas e os Itens Enviados indicam o que você já respondeu.
- `api/classificar.js` (função serverless): recebe lotes de até 40 emails (assunto, remetente,
  destinatários e prévia do corpo) e classifica com o Claude (`claude-opus-5-5`, esforço baixo,
  saída em JSON validada por schema, com fallback automático em caso de recusa).
  A função confere o token Microsoft do usuário no Graph e só aceita contas dos domínios em `ALLOWED_DOMAINS`.
- `api/config.js`: entrega ao navegador o ID do app do Azure (informação pública).
- As classificações ficam guardadas no navegador por 30 dias; reanalisar não gasta IA com o que já foi visto.
  Os "resolvidos" também ficam no navegador.

## Configuração

### 1. Registrar o app no Azure (Microsoft Entra) — feito por quem administra o Microsoft 365

1. Portal Azure → **Microsoft Entra ID** → **Registros de aplicativo** → **Novo registro**.
2. Nome: `Analisador de Email`. Tipos de conta: **somente contas deste diretório organizacional**.
3. URI de redirecionamento: plataforma **Aplicativo de página única (SPA)**, endereço
   `https://<projeto>.vercel.app/` (com a barra no final).
4. Em **Permissões de API** → Microsoft Graph → **Permissões delegadas**: `User.Read` e `Mail.Read`.
   Se a organização exigir, clique em **Conceder consentimento do administrador**.
5. Anote o **ID do aplicativo (cliente)** e o **ID do diretório (locatário)**.

### 2. Variáveis de ambiente no Vercel (Settings → Environment Variables)

| Variável | Valor |
|---|---|
| `AZURE_CLIENT_ID` | ID do aplicativo (cliente) do passo 1 |
| `AZURE_TENANT_ID` | ID do diretório (locatário) do passo 1 |
| `ALLOWED_DOMAINS` | `ametaengenharia.com.br` (vários separados por vírgula) |
| `ANTHROPIC_API_KEY` | chave da API da Anthropic (marque como *Sensitive*) |
| `CLAUDE_MODEL` | opcional; padrão `claude-opus-5-5` |

Depois de mudar variáveis, faça um novo deploy (Deployments → Redeploy).

### 3. Projeto no Vercel

Publicado em **https://analisador-email.vercel.app** (projeto `analisador-email`, time AssistentePessoal),
sem framework: o Vercel serve os arquivos estáticos e as funções de `api/`.

O primeiro deploy foi feito enviando os arquivos desta pasta direto (o app do Vercel no GitHub
ainda não tem acesso a este repositório). Para o Vercel publicar sozinho a cada push, dê acesso ao
repositório no app do Vercel no GitHub e conecte o projeto em Settings → Git, com
**Root Directory = `analisador-email`**.

## Custos

Cada conversa nova manda ~200–400 tokens para a IA. Uma semana com ~800 emails custa em torno de
US$ 0,50–1,00 no `claude-opus-5-5`. Propaganda óbvia é filtrada sem IA, e o que já foi
classificado fica em cache no navegador.
