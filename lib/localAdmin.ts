import { existsSync, readFileSync } from "fs";
import path from "path";

function readEnvFile(name: string) {
  const filePath = path.join(process.cwd(), name);
  if (!existsSync(filePath)) return {};

  const values: Record<string, string> = {};
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    values[trimmed.slice(0, separator).trim()] = trimmed.slice(separator + 1).trim();
  }
  return values;
}

export function readLocalEnv(name: string) {
  const file = {
    ...readEnvFile(".env"),
    ...readEnvFile(".env.local"),
  };

  return process.env[name] || file[name] || "";
}

export function getLocalAdminCredentials() {
  return {
    email: readLocalEnv("ADMIN_EMAIL"),
    password: readLocalEnv("ADMIN_PASSWORD"),
  };
}
