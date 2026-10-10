import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseclient";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const FIELDS = [
  "applicant_name",
  "applicant_email",
  "applicant_phone",
  "current_role_name",
  "total_experience",
  "skills",
  "expected_salary",
  "cover_letter",
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume");
    const slug = String(formData.get("slug") ?? "").trim();

    if (!(resumeFile instanceof File) || resumeFile.size === 0) {
      return NextResponse.json({ success: false, message: "Please attach your resume." }, { status: 400 });
    }
    if (resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ success: false, message: "Resume must be 5 MB or smaller." }, { status: 400 });
    }
    if (resumeFile.type && !ALLOWED_TYPES.includes(resumeFile.type)) {
      return NextResponse.json({ success: false, message: "Resume must be a PDF or Word document." }, { status: 400 });
    }

    const fields: Record<string, string> = {};
    for (const key of FIELDS) fields[key] = String(formData.get(key) ?? "").trim();

    if (!fields.applicant_name || !fields.applicant_email) {
      return NextResponse.json({ success: false, message: "Name and email are required." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data: job } = await supabase
      .from("job")
      .select("id, title")
      .eq("slug", slug)
      .maybeSingle();

    if (!job) {
      return NextResponse.json({ success: false, message: "This role is no longer open." }, { status: 404 });
    }

    const extension = resumeFile.name.split(".").pop()?.toLowerCase() || "pdf";
    const filePath = `${job.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, resumeFile, { contentType: resumeFile.type || undefined });

    if (uploadError) {
      return NextResponse.json({ success: false, message: uploadError.message }, { status: 500 });
    }

    const { error } = await supabase.from("applications").insert({
      ...fields,
      job_id: job.id,
      job_title: job.title,
      job_slug: slug,
      resume_url: filePath,
      stage: "applied",
    });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
