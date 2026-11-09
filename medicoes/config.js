// Configuração do app — preencha com os dados do seu projeto Supabase
// (Painel Supabase › Project Settings › API). A chave "anon" é pública por
// natureza; a segurança fica nas políticas do banco (banco/sismed-banco-completo.sql).
// Projeto: MediçãoAlimentação (organização Estoque_Ameta).
window.APP_CONFIG = {
  SUPABASE_URL: "https://zulgrvlvylbpgabteagw.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1bGdydmx2eWxicGdhYnRlYWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMjE0MzksImV4cCI6MjEwOTc5NzQzOX0.JkFKvf2YsuFDFA18gaV3zxVo68Ys_gJKz7OymRJYras",
  EMAIL_DOMAIN: "rafinfraestrutura.com.br",   // logins viram login@rafinfraestrutura.com.br internamente (nenhum e-mail é enviado com "Confirm email" desligado)
  DIAS_HISTORICO: 400              // quantos dias de registros o app carrega
};
