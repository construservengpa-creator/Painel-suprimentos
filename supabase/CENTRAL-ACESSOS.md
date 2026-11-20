# Central de acessos do Capivara

Aba **🛡️ Central de acessos** no Painel (só administrador). Um cadastro de pessoas para todas as aplicações:

| Tela | O que faz |
|---|---|
| **Pessoas** | Quem usa cada aplicação, com qual perfil, em quantas obras, e quem ainda está sem login. Ao clicar em **Editar**: dados da pessoa e, por aplicação, perfil, obras, validade, e os botões de login e senha. |
| **Perfis e permissões** | Por aplicação: cada perfil é uma lista de permissões (o que a pessoa vê, executa, aprova e exclui). Mudou o perfil, vale na hora para todos que o têm. |
| **Obras** | Cadastro único de obras e o id de cada obra dentro de cada aplicação (o vínculo que leva a restrição por obra até o app). |
| **Histórico** | Quem mudou o quê e quando. Senhas nunca são registradas. |

## Como a central conversa com cada aplicação

| Aplicação | Projeto Supabase | Perfil e obras chegam ao app por… | Login e senha |
|---|---|---|---|
| Suprimentos (Painel) | painel_suprimentos | trigger → `public.perfis` (o papel sai das permissões: ver tabela abaixo) | função `central-acessos` |
| Validador Email | painel_suprimentos | trigger → `public.validador_email_acesso` | mesmo login do Painel |
| CAP-Refeições | painel_suprimentos (schema `medicoes`) | trigger → `medicoes.usuarios` (`perms`, `perfil`, `obras`, `ativo`) | função `central-acessos` (login vira `LOGIN@rafinfraestrutura.com.br`) |
| Notas | Controle_Documentos-Fiscais | função `central-acessos` → `profiles` (role/coluna/active) e `validador_acessos` (obras) | função, com o secret `NOTAS_SERVICE_ROLE_KEY` |
| Estoque | almoxarifado (qjmqburjyqlgwjihvlgp) | **ainda não** — o perfil fica registrado na central, mas o app não lê | função, com o secret `ESTOQUE_SERVICE_ROLE_KEY` |

**A central é a fonte da verdade.** Ajustes feitos dentro de cada app continuam funcionando, mas são sobrescritos na próxima vez que a central salvar aquela pessoa naquela aplicação.

Papel no Painel, calculado a partir das permissões do perfil de Suprimentos:

| Tem a permissão | Vira |
|---|---|
| `painel.usuarios` ou `painel.importar` | Administrador (sempre com Jarvis) |
| `painel.creditos` | Supervisor |
| `painel.cap` | Operador avançado |
| `painel.contratos` | Operador |
| nenhuma das acima | Convidado |
| `painel.jarvis` | + Jarvis liberado |

## Instalação (uma vez)

1. **SQL Editor** do projeto `painel_suprimentos`: rode `supabase/central_acessos.sql` inteiro. Pode rodar de novo quando quiser.
2. **Edge Functions → Deploy a new function**, nome `central-acessos`, conteúdo de `supabase/functions/central-acessos/index.ts`, com **Verify JWT ligado**.
3. **Edge Functions → Secrets** (para ligar login/senha dos outros projetos):
   - `NOTAS_SERVICE_ROLE_KEY` — *Project Settings › API › service_role* do projeto Controle_Documentos-Fiscais.
   - `ESTOQUE_SERVICE_ROLE_KEY` — o mesmo, do projeto do Estoque.
   Sem eles a central funciona, só não troca senha nesses dois apps (aparece um aviso na tela).
4. No Painel, aba **Central de acessos → Importar usuários existentes**. Traz quem já usa o Painel, o Validador Email, o CAP-Refeições e (com o secret) o Notas, reconhecendo a mesma pessoa pelo e-mail. Nada muda dentro dos apps na importação.
5. Confira as pessoas repetidas (mesma pessoa com e-mails diferentes em apps diferentes) e os perfis `Personalizado · Nome` criados para quem tinha permissões individuais no CAP-Refeições.

## Senhas

- **Gerar senha temporária**: cria uma senha aleatória, mostra uma vez para o administrador repassar e marca `trocar_senha` no login.
- **Definir senha…**: o administrador digita a senha (mín. 8, letras e números).
- **Enviar link de redefinição**: o Supabase do app manda o e-mail (não serve para o CAP-Refeições, cujo login não é e-mail de verdade).
- **Bloquear login**: ninguém entra com aquele login (nem com digital). Atenção: no projeto do Painel o mesmo login pode servir ao Suprimentos e ao Validador Email — a tela avisa.
- Nenhuma senha é gravada na central nem no histórico.

## Para as aplicações lerem a central (mesmo projeto)

```js
const { data } = await sb.rpc('acesso_meu', { p_app: 'refeicoes' });
// { ativo, perfil, permissoes: [...], todas_obras, obras: [{ id, nome, ref }] }
```

Em políticas RLS: `public.acesso_pode('refeicoes', 'sup.bm')`.

## Próximos passos

- Estoque: ligar o app à central (ler `acesso_meu` via função, ou gravar o perfil no cadastro dele como é feito no Notas). Precisa do esquema de usuários do projeto do Estoque.
- Exigir a troca da senha temporária no primeiro login (cada app lê `user_metadata.trocar_senha`).
