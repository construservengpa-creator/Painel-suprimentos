// Configuração do app — dados do projeto Supabase (Painel Supabase › Project Settings › API).
// A chave anon é pública por natureza; a segurança fica nas políticas do banco
// (banco/sismed-painel-suprimentos.sql).
// Projeto: painel_suprimentos — o Medições usa o schema próprio "medicoes" (o Painel usa o "public").
window.APP_CONFIG = {
  SUPABASE_URL: "https://xuukjnpkltvgzjfgivnd.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dWtqbnBrbHR2Z3pqZmdpdm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMDc3NjcsImV4cCI6MjEwMzU4Mzc2N30.UqImzJ_kSMySBF_l1fzlAGsGiPU6fvjPcBSyLmPuXJ8",
  DB_SCHEMA: "medicoes",                  // tabelas e funções do Medições
  AUTH_STORAGE_KEY: "sb-medicoes-auth",   // sessão separada da do Painel no mesmo navegador
  EMAIL_DOMAIN: "rafinfraestrutura.com.br",   // logins viram login@rafinfraestrutura.com.br internamente (nenhum e-mail é enviado com "Confirm email" desligado)
  DIAS_HISTORICO: 400              // quantos dias de registros o app carrega
};
