import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readLocalEnv } from "./localAdmin";

let client: SupabaseClient | null = null;
let clientKey = "";

export function getSupabase() {
  const url = readLocalEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/+$/, "");
  const key = (readLocalEnv("SUPABASE_SERVICE_ROLE_KEY") || readLocalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")).replace(/^Bearer\s+/i, "");

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured.");
  }

  if (!client || clientKey !== key) {
    client = createClient(url, key);
    clientKey = key;
  }

  return client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property, receiver) {
    const real = getSupabase();
    const value = Reflect.get(real, property, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
