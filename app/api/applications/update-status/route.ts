import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

const STAGES = ["applied", "reviewed", "shortlisted", "rejected", "hired"];

export async function POST(req: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const { id, stage } = await req.json();

    if (!id || !STAGES.includes(stage)) {
      return NextResponse.json({ success: false, message: "Invalid application or stage." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("applications").update({ stage }).eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 503 }
    );
  }
}
