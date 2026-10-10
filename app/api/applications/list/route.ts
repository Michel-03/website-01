import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";
import { signResumeUrl } from "@/lib/resumeLinks";

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    const rows = await Promise.all(
      (data ?? []).map(async (row) => ({
        ...row,
        resume_url: await signResumeUrl(supabase, row.resume_url),
      }))
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 503 }
    );
  }
}
