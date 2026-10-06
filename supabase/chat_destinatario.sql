-- Chat do painel: destinatário das mensagens (já aplicado no projeto painel_suprimentos).
-- destinatario_id nulo = mensagem para todos; preenchido = mensagem direta,
-- que só o autor e o destinatário conseguem ler.

alter table public.chat_mensagens
  add column if not exists destinatario_id uuid references public.perfis(id) on delete cascade,
  add column if not exists destinatario_nome text;
create index if not exists chat_mensagens_destinatario_idx on public.chat_mensagens(destinatario_id) where destinatario_id is not null;

-- O servidor grava autor/data/nome do destinatário e recusa destinatário
-- inexistente, o próprio autor ou quem não alcança o assunto.
create or replace function private.chat_preencher_autor()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  new.autor_id   := auth.uid();
  new.criado_em  := now();
  new.autor_nome := coalesce(
    (select nullif(btrim(p.nome), '') from public.perfis p where p.id = auth.uid()),
    'Usuário');
  if new.destinatario_id is null then
    new.destinatario_nome := null;
  else
    if new.destinatario_id = new.autor_id then
      raise exception 'Não é possível enviar mensagem para si mesmo.';
    end if;
    if not exists (select 1 from public.perfis p where p.id = new.destinatario_id) then
      raise exception 'Destinatário não encontrado.';
    end if;
    if not private.tema_liberado(new.destinatario_id, new.assunto) then
      raise exception 'O destinatário não tem acesso a esse assunto.';
    end if;
    new.destinatario_nome := coalesce(
      (select nullif(btrim(p.nome), '') from public.perfis p where p.id = new.destinatario_id),
      'Usuário');
  end if;
  return new;
end;
$$;

alter policy "usuario logado le chat do seu perfil" on public.chat_mensagens
  using (
    (select auth.uid()) is not null
    and private.tema_liberado((select auth.uid()), assunto)
    and (destinatario_id is null or autor_id = (select auth.uid()) or destinatario_id = (select auth.uid()))
  );

-- Lista de destinatários para o campo "Para" (todos menos quem pergunta),
-- com os assuntos que cada um alcança.
create or replace function public.chat_destinatarios()
returns table(id uuid, nome text, temas text[])
language sql stable security definer set search_path to 'public' as $$
  select p.id,
         coalesce(nullif(btrim(p.nome), ''), 'Usuário'),
         array(select t from unnest(array['geral','suprimentos','fluxo','criticos','cotacoes','contratos','cap','creditos']) t
               where private.tema_liberado(p.id, t))
  from public.perfis p
  where auth.uid() is not null and p.id <> auth.uid()
  order by 2;
$$;
revoke all on function public.chat_destinatarios() from public, anon;
grant execute on function public.chat_destinatarios() to authenticated;
