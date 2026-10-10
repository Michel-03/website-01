import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/requireAdmin";
import { getSupabase } from "@/lib/supabaseclient";

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;

  try {
    const supabase = getSupabase();
    const [applications, messages, jobs] = await Promise.all([
      supabase
        .from("applications")
        .select("id, applicant_name, job_title, stage, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("contact_form")
        .select("id, first_name, last_name, email, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("job")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

    const firstError = applications.error || messages.error || jobs.error;
    if (firstError) {
      return NextResponse.json({ success: false, error: firstError.message }, { status: 500 });
    }

    const items = [
      ...(applications.data ?? []).map((row) => ({
        id: `application-${row.id}`,
        kind: "application",
        title: `${row.applicant_name} applied for ${row.job_title ?? "a role"}`,
        detail: `Stage: ${row.stage ?? "applied"}`,
        href: `/admin/applications/${row.id}`,
        at: row.created_at,
      })),
      ...(messages.data ?? []).map((row) => ({
        id: `message-${row.id}`,
        kind: "message",
        title: `${[row.first_name, row.last_name].filter(Boolean).join(" ") || row.email} sent an inquiry`,
        detail: row.email,
        href: "/admin/contact-messages",
        at: row.created_at,
      })),
      ...(jobs.data ?? []).map((row) => ({
        id: `job-${row.id}`,
        kind: "job",
        title: `${row.title} was published`,
        detail: "Careers page",
        href: `/admin/job-list/edit/${row.id}`,
        at: row.created_at,
      })),
    ]
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
      .slice(0, 10);

    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Database not connected" },
      { status: 503 }
    );
  }
}
