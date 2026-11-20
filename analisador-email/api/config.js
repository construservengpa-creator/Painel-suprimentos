// Configuração pública do app (nada aqui é segredo): o frontend lê isto para
// montar o login da Microsoft sem precisar recompilar quando mudar o Azure.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    clientId: process.env.AZURE_CLIENT_ID || "",
    tenantId: process.env.AZURE_TENANT_ID || "organizations",
    dominios: (process.env.ALLOWED_DOMAINS || "").split(",").map((d) => d.trim()).filter(Boolean),
    iaConfigurada: Boolean(process.env.ANTHROPIC_API_KEY),
  });
}
