import { NextResponse } from "next/server";
import { readLocalEnv } from "@/lib/localAdmin";
import { getSupabase } from "@/lib/supabaseclient";

const tables = ["job", "applications", "contact_form", "site_links", "admin_users"];

export async function GET() {
  const configured = {
    supabaseUrl: Boolean(readLocalEnv("NEXT_PUBLIC_SUPABASE_URL")),
    serviceKey: Boolean(readLocalEnv("SUPABASE_SERVICE_ROLE_KEY")),
    realtimeKey: Boolean(readLocalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")),
  };

  if (!configured.supabaseUrl || (!configured.serviceKey && !configured.realtimeKey)) {
    return NextResponse.json({ success: true, connected: false, configured, tables: {} });
  }

  try {
    const supabase = getSupabase();
    const results = await Promise.all(
      tables.map(async (table) => {
        const { error } = await supabase.from(table).select("*", { count: "exact", head: true });
        return [table, error ? error.message : "ok"] as const;
      })
    );

    return NextResponse.json({
      success: true,
      connected: results.some(([, state]) => state === "ok"),
      configured,
      tables: Object.fromEntries(results),
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      connected: false,
      configured,
      tables: {},
      error: error instanceof Error ? error.message : "Connection failed",
    });
  }
}
