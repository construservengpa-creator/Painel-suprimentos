-- Validador Email: triagem da caixa de entrada do Outlook, visível só para o dono.
-- Aplicado no projeto painel_suprimentos (xuukjnpkltvgzjfgivnd).
--
-- Fluxo: uma tarefa agendada do Claude lê o Outlook do usuário pelo conector
-- Microsoft 365, classifica cada conversa (ação / responder / acompanhar /
-- informativo / ruído / já respondido) e grava aqui pelo conector do Supabase
-- (que escreve como dono do banco, por fora do RLS). O painel
-- (validador-email.html) só lê.
--
-- Permissões:
--   validador_email_acesso   -> cada usuário só enxerga a própria linha; é ela que
--                               faz o botão "Validador Email" aparecer no menu.
--   triagem_email            -> leitura só do dono (dono = auth.uid()) e só se ele
--                               tiver acesso; o usuário só pode mudar "resolvido".
--   validador_email_execucoes-> leitura só do dono (mostra a última análise).
-- Ninguém mais vê, nem administradores do painel.

create table if not exists public.validador_email_acesso (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  criado_em  timestamptz not null default now()
);

create table if not exists public.triagem_email (
  id               text primary key,          -- id da mensagem no Outlook (a mais recente da conversa)
  dono             uuid not null references auth.users(id) on delete cascade,
  assunto          text,
  remetente        text,
  remetente_email  text,
  recebido_em      timestamptz,
  categoria        text not null check (categoria in ('acao','responder','acompanhar','informativo','ruido','respondido')),
  prioridade       text not null default 'media' check (prioridade in ('alta','media','baixa')),
  resumo           text,
  acao_sugerida    text,
  prazo            text,
  link             text,                      -- abre o email no Outlook na web
  lido             boolean,
  em_copia         boolean,                   -- true quando o dono não está em "Para"
  importancia      text,
  resolvido        boolean not null default false,
  resolvido_em     timestamptz,
  analisado_em     timestamptz not null default now()
);

create index if not exists triagem_email_dono_recebido on public.triagem_email (dono, recebido_em desc);

create table if not exists public.validador_email_execucoes (
  id             bigserial primary key,
  dono           uuid not null references auth.users(id) on delete cascade,
  executado_em   timestamptz not null default now(),
  periodo_desde  timestamptz,
  emails_lidos   integer,
  conversas      integer,
  observacao     text
);

alter table public.validador_email_acesso    enable row level security;
alter table public.triagem_email             enable row level security;
alter table public.validador_email_execucoes enable row level security;

drop policy if exists "acesso: própria linha" on public.validador_email_acesso;
create policy "acesso: própria linha" on public.validador_email_acesso
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "triagem: dono lê" on public.triagem_email;
create policy "triagem: dono lê" on public.triagem_email
  for select to authenticated
  using (dono = auth.uid() and exists (select 1 from public.validador_email_acesso a where a.user_id = auth.uid()));

drop policy if exists "triagem: dono marca resolvido" on public.triagem_email;
create policy "triagem: dono marca resolvido" on public.triagem_email
  for update to authenticated
  using (dono = auth.uid() and exists (select 1 from public.validador_email_acesso a where a.user_id = auth.uid()))
  with check (dono = auth.uid());

drop policy if exists "execuções: dono lê" on public.validador_email_execucoes;
create policy "execuções: dono lê" on public.validador_email_execucoes
  for select to authenticated using (dono = auth.uid());

-- O navegador só pode ler, e na triagem só pode mudar "resolvido".
revoke all on public.validador_email_acesso, public.triagem_email, public.validador_email_execucoes from anon, authenticated;
grant select on public.validador_email_acesso, public.triagem_email, public.validador_email_execucoes to authenticated;
grant update (resolvido, resolvido_em) on public.triagem_email to authenticated;

-- Libera o Validador para o usuário danielgustavo@ametaengenharia.com.br.
insert into public.validador_email_acesso (user_id)
select id from auth.users where email = 'danielgustavo@ametaengenharia.com.br'
on conflict do nothing;
