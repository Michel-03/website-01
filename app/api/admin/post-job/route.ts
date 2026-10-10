import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

const FIELDS = ["title", "location", "salary", "description", "experience", "skills", "slug"];

export async function POST(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const job: Record<string, string> = {};
    for (const key of FIELDS) job[key] = String(body[key] ?? "").trim();

    if (!job.title || !job.slug) {
      return NextResponse.json({ success: false, error: "Title and URL slug are required." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase.from("job").insert([job]).select().single();

    if (error) {
      const message = error.code === "23505" ? "Another job already uses that URL slug." : error.message;
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }

    return NextResponse.json({ success: true, job: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 503 }
    );
  }
}
