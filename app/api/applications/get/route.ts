import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";
import { signResumeUrl } from "@/lib/resumeLinks";

export async function GET(req: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("applications").select("*").eq("id", id).single();

    if (error || !data) {
      return NextResponse.json({ success: false, message: error?.message ?? "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { ...data, resume_url: await signResumeUrl(supabase, data.resume_url) },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 503 }
    );
  }
}
