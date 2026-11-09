// Configuração do app — preencha com os dados do seu projeto Supabase
// (Painel Supabase › Project Settings › API). A chave "anon" é pública por
// natureza; a segurança fica nas políticas do banco (schema.sql).
window.APP_CONFIG = {
  SUPABASE_URL: "https://jtmywxywzkobhplvgwlb.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0bXl3eHl3emtvYmhwbHZnd2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzk5OTYsImV4cCI6MjEwNTc1NTk5Nn0.VB579aok0pY-SU0JatPUgnwgf5FNUMiwn6QwrSOiwSw",
  EMAIL_DOMAIN: "rafinfraestrutura.com.br",   // logins viram login@rafinfraestrutura.com.br internamente (nenhum e-mail é enviado com "Confirm email" desligado)
  DIAS_HISTORICO: 400              // quantos dias de registros o app carrega
};
