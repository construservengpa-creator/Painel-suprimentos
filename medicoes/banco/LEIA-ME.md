# Banco do SISMED (Medição de Refeições) — reconstruído

O `schema.sql` da pasta de cima é da versão 1.0 e **não tem tudo o que o app v3.1.1 usa**.
Esta pasta tem o banco completo, reconstruído a partir do código do app (`app-3.1.1.js`).

| Arquivo | O que é |
|---|---|
| `sismed-banco-completo.sql` | Tabelas, permissões (RLS), funções, armazenamento e limpeza automática. Substitui o `schema.sql`. |
| `fotos-compactar/index.ts` | Função do servidor (Edge Function) que junta as fotos em `.zip` por dia e apaga as vencidas. |

## Instalar num projeto Supabase novo

1. **SQL Editor → New query**: cole o conteúdo inteiro de `sismed-banco-completo.sql` e clique **Run**.
   Deve terminar sem erro. Pode rodar de novo quando quiser.
2. **Authentication → Providers → Email**: desligue **Confirm email**.
3. **Edge Functions → Deploy a new function**, com o nome `fotos-compactar` e o conteúdo de `fotos-compactar/index.ts`.
   Sem ela, o app funciona, mas o botão "Compactar agora" (Auditoria › Arquivos compactados › Fotos) dá erro
   e as fotos não vão para o arquivo `.zip`.
4. Opcional — **Database → Extensions**: ligue `pg_cron` e rode o SQL de novo. Assim, mensagens com mais de 7 dias,
   notificações com mais de 30 dias e sessões com mais de 90 dias são apagadas sozinhas, todo dia.
5. **Project Settings → API**: copie a **Project URL** e a chave **anon public** para o `../config.js`.
6. Abra o app: na primeira vez ele mostra **"Criar administrador e entrar"**. Esse primeiro usuário recebe todos os acessos.

## O que tem no banco

- **Tabelas** (cada linha guarda o objeto do app em `data`): usuarios, perfis, empresas (inclui terceirizadas), obras,
  colaboradores, precos, contratos, contratadas (restaurantes), registros, sobras, bms e config (contratada, horários,
  LGPD e os dias validados no Fechamento).
- **Auditoria**: o servidor carimba usuário, IP e navegador. Ninguém altera nem apaga eventos.
  Quando a trilha chega a 6.000 eventos, os 3.000 mais antigos viram um CSV em `auditoria_arquivos`.
- **Outras tabelas**: notificacoes, mensagens, sessoes (quem está online), fotos_arquivos e jogo_pontos.
- **Funções que o app chama**: bootstrap_needed, email_por_login, login_livre, lgpd_publico, sync_update,
  estornar_registros, excluir_registro, admin_create_user, admin_set_password, admin_delete_user, fotos_uso,
  jogo_registrar e jogo_ranking.
- **Armazenamento**: `anexos` (BM assinado) e `fotos` (`c/` consulta por 20 dias, `a/` aguardando, `z/` zips por 12 meses).

## Regras de acesso (resumo)

As permissões do servidor seguem as mesmas do app (`can()`). O administrador pode tudo. Usuário inativo ou com
cadastro **pendente** (criou a própria conta e ainda não foi aprovado) não lê nem grava nada, só a própria linha.

- **Estorno** (Restaurante, `rest.estornar`): só a refeição de hoje, fora de BM, não fechada, com o dia não validado
  e do restaurante/obra do usuário. Vale com justificativa e grava a Auditoria.
- **Excluir registro avulso** (`del.registros`): qualquer dia, fora de BM e com o dia não validado. Também exige
  justificativa e grava a Auditoria.
- **Usuários**: criar, redefinir senha e excluir exigem `cfg.usuarios`. Só um administrador mexe em outro
  administrador, e ninguém exclui a si mesmo.

## Diferenças em relação ao banco original (conhecidas)

Este banco foi **escrito a partir do que o app espera**, não copiado do original. Por isso:

- A regra "obra-empresa" do original (recusar refeição de obra de outra empresa) **não foi recriada**.
  O app só reage a essa recusa; sem ela, nada quebra.
- As regras de quem grava cada tabela foram deduzidas das telas do app. Se algum perfil receber
  "Alteração recusada pelo servidor: sem permissão", ajuste a política correspondente na seção 5 do SQL.
- Os dados do app original **não** são trazidos: o banco começa vazio.

## Testes feitos

O SQL foi rodado duas vezes seguidas, sem erro, num PostgreSQL 16 que imita o Supabase (esquemas `auth` e `storage`).
Foram conferidos:

- primeiro acesso e cadastro pendente;
- criação de usuário pelo administrador;
- permissões do Restaurante;
- estorno (aceito / recusado por dia, restaurante e justificativa);
- exclusão com dia validado;
- mensagens (remetente forjado é recusado);
- jogo, uso de fotos e regras do armazenamento;
- troca de senha e exclusão de usuário;
- compactação e imutabilidade da Auditoria.

A Edge Function só teve a sintaxe conferida: precisa ser testada no projeto
(Auditoria › Arquivos compactados › Fotos › "Compactar agora").

**Antes de usar com dados reais**, teste no projeto novo: criar o administrador, criar um usuário de cada perfil,
registrar uma refeição com foto, estornar, emitir/fechar/assinar um BM e anexar o BM assinado.
