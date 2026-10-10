import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseclient";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("job")
      .select("id, title, slug, location, salary, experience, skills, description, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Database not connected" },
      { status: 503 }
    );
  }
}
