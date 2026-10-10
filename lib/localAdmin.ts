function cleanEnv(value: string) {
  const trimmed = value.trim();
  const quoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
  return quoted ? trimmed.slice(1, -1).trim() : trimmed;
}

export function readLocalEnv(name: string) {
  return cleanEnv(process.env[name] ?? "");
}

export function getLocalAdminCredentials() {
  return {
    email: readLocalEnv("ADMIN_EMAIL"),
    password: readLocalEnv("ADMIN_PASSWORD"),
  };
}
