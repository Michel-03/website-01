import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);
const HASH_PREFIX = "scrypt$";

export function isPasswordHash(stored: string) {
  return stored.startsWith(HASH_PREFIX);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${HASH_PREFIX}${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  if (!isPasswordHash(stored)) return safeEqual(password, stored);

  const [, salt, hash] = stored.split("$");
  if (!salt || !hash) return false;

  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const actual = Buffer.from(hash, "hex");
  if (actual.length !== derived.length) return false;
  return timingSafeEqual(actual, derived);
}

export function safeEqual(left: string, right: string) {
  return timingSafeEqual(createHash("sha256").update(left).digest(), createHash("sha256").update(right).digest());
}
