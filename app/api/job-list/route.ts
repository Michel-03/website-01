import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("job")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, jobs: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Database not connected" },
      { status: 503 }
    );
  }
}
