import type { SupabaseClient } from "@supabase/supabase-js";

const PUBLIC_MARKER = "/storage/v1/object/public/resumes/";

function storagePath(value: string) {
  if (!value) return null;
  if (value.includes(PUBLIC_MARKER)) return value.split(PUBLIC_MARKER)[1];
  if (value.startsWith("http")) return null;
  return value;
}

export async function signResumeUrl(supabase: SupabaseClient, value?: string | null) {
  const path = storagePath(value ?? "");
  if (!path) return value ?? null;

  const { data } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 30);
  return data?.signedUrl ?? null;
}
