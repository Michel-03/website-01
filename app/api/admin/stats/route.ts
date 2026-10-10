import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

async function countRows(table: string) {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) return { count: 0, error: error.message };
  return { count: count ?? 0, error: null };
}

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const [jobs, applications, messages, links] = await Promise.all([
      countRows("job"),
      countRows("applications"),
      countRows("contact_form"),
      countRows("site_links"),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        jobs: jobs.count,
        applications: applications.count,
        messages: messages.count,
        links: links.count,
      },
      warnings: [jobs.error, applications.error, messages.error, links.error].filter(Boolean),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
