# Medição de Refeições — versão online (Supabase)

Versão 1.0 · corte em 23/09/2026 · plano gratuito

Conteúdo desta pasta:

| Arquivo | O que é |
|---|---|
| `index.html` | O app (Restaurante, Suprimentos, Auditoria, Configurações) já conectado ao Supabase |
| `config.js` | URL e chave pública do seu projeto Supabase — **único arquivo a editar** |
| `schema.sql` | Banco de dados completo: tabelas, permissões (RLS), auditoria com IP, bucket de anexos |
| `manifest.json`, `sw.js`, `icon*.png/svg` | Deixam o app instalável no celular (ícone na tela inicial) e abrem a tela mesmo sem sinal |
| `prototipo-localstorage-corte-2026-09-23.html` | Versão anterior, sem servidor (dados só no navegador). Guardada como corte para migração futura |

---

## 1. Criar o projeto no Supabase (5 min)

1. Entre em <https://supabase.com> → **New project**. Nome: `refeicoes`, região: **South America (São Paulo)**, plano **Free**. Guarde a senha do banco.
2. Quando o projeto terminar de criar, vá em **SQL Editor → New query**, cole o conteúdo inteiro de `schema.sql` e clique **Run**. Deve terminar sem erro (pode rodar de novo à vontade).
3. **Authentication → Providers → Email**: desligue **Confirm email** e salve. (Os logins são internos, no formato `login@refeicoes.app`; nenhum e-mail é enviado.)
4. **Project Settings → API**: copie **Project URL** e a chave **anon public** para o `config.js`:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://xxxxxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJ...",
  ...
};
```

A chave *anon* é pública por natureza — a proteção está nas políticas do banco (quem não está cadastrado e ativo no app não lê nem grava nada).

## 2. Publicar o app em um endereço HTTPS

A câmera só funciona em `https://`. Qualquer uma das opções abaixo é gratuita e já vem com HTTPS:

**GitHub Pages (recomendado — permite atualizar pelo Claude):** crie um repositório, envie os arquivos desta pasta (menos o protótipo antigo), em *Settings → Pages* escolha *Deploy from branch* → `main` → `/ (root)`. Endereço: `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

**Netlify Drop:** <https://app.netlify.com/drop> — arraste a pasta. Endereço gerado na hora; pode trocar o nome depois.

**Cloudflare Pages:** *Workers & Pages → Create → Upload assets* — arraste a pasta.

Depois, no celular, abra o endereço no Chrome (Android) ou Safari (iPhone) e use **"Adicionar à tela inicial"**. O app passa a abrir como aplicativo, com câmera.

## 3. Primeiro acesso

Ao abrir o app pela primeira vez ele detecta que não há usuários e mostra **"Criar administrador e entrar"**. Esse primeiro usuário recebe todas as permissões. A partir daí, em *Configurações › Usuários*, o administrador cria os usuários do Restaurante e do Suprimentos, escolhendo o que cada um pode ver/alterar.

Ordem sugerida de cadastro: Empresas (com logotipo) → Obras → Preços → Contratada → Colaboradores (lendo o QR do crachá) → Usuários.

## 4. Permissões que o sistema usa

| Permissão | Libera |
|---|---|
| `rest.registrar` | Ler QR e registrar refeição |
| `rest.sobras` | Registrar/excluir sobras |
| `rest.estornar` | Estornar refeição do dia (só se ainda não estiver em BM) |
| `rest.validar` | Validar BM (assinatura eletrônica do restaurante) |
| `sup.ver` | Ver registros e resumos |
| `sup.bm` | Emitir, fechar, imprimir e assinar BM |
| `sup.nf` | Informar nota fiscal, anexar/remover BM assinado |
| `aud.ver` | Ver a trilha de auditoria |
| `cfg.usuarios`, `cfg.colab`, `cfg.empresas`, `cfg.obras`, `cfg.precos`, `cfg.contratada` | Cada cadastro |

As mesmas permissões são aplicadas **no servidor** (Row Level Security): mesmo alguém que altere o app no navegador não consegue gravar o que não pode. Auditoria e histórico de preços são imutáveis no banco (gatilhos bloqueiam update/delete).

## 5. Auditoria com IP

Cada evento gravado recebe, **pelo servidor**, o usuário autenticado, o IP de origem (`x-forwarded-for`) e o navegador. O app não consegue forjar nem editar esses campos. Lembre que dentro da mesma rede da empresa todos aparecem com o mesmo IP público — por isso a coluna *Dispositivo* (código gerado em cada aparelho) continua existindo.

## 6. Funcionamento sem internet

O app guarda os dados no aparelho e enfileira registros feitos sem sinal; a bolinha ao lado do nome do usuário indica: verde = sincronizado, amarelo = enviando, vermelho = sem conexão (será reenviado automaticamente). Para o restaurante isso evita fila parada. O login em si precisa de internet.

## 7. Operação e limites do plano gratuito

- Projetos gratuitos **pausam após 7 dias sem uso**; basta usar o app (ou clicar *Restore* no painel) para reativar. Em uso diário isso não acontece.
- 500 MB de banco e 1 GB de arquivos — suficiente para anos de registros e centenas de BMs anexados.
- **Senha de outro usuário**: o app permite que cada um troque a própria senha; para redefinir a senha de um terceiro, use o painel Supabase (*Authentication → Users → … → Reset password*). Na versão final isso pode virar uma função no servidor.
- **Backup**: *Database → Backups* (diário no plano pago) ou exporte as tabelas em CSV/JSON pelo *Table Editor*. Como cada tabela guarda o objeto completo em `data` (JSON), a migração para outra base é direta.
- **Zerar dados de teste** antes de entrar em produção: no SQL Editor, `truncate public.registros, public.sobras, public.bms;` (a auditoria é imutável por design; para zerá-la em teste, desative temporariamente o gatilho `auditoria_immutable`).

## 8. Atualizações

Para atualizar o app basta substituir `index.html` (e `sw.js` se mudar) na hospedagem. O `config.js` e o banco continuam os mesmos.
