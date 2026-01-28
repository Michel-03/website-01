import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const slug = formData.get("slug") as string;
    const jobId = Number(formData.get("slug"));

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch job details
    const { data: job } = await supabase
      .from("job")
      .select("id, title")
      .eq("id", jobId)
      .single();

    // Upload resume
    const fileExt = resumeFile.name.split(".").pop();
    const filePath = `resumes/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, resumeFile, {
        contentType: resumeFile.type,
      });

    if (uploadError) {
      return NextResponse.json({
        success: false,
        message: uploadError.message,
      });
    }

    // Public URL
    const { data: publicUrl } = supabase.storage
      .from("resumes")
      .getPublicUrl(filePath);

    // Insert into applications table
    const fields: any = {};
    formData.forEach((v, k) => {
      if (k !== "resume" && k !== "slug") fields[k] = v;
    });

    const { error } = await supabase.from("applications").insert({
      ...fields,
      job_id: job?.id,
      job_title: job?.title,
      job_slug: slug,
      resume_url: publicUrl.publicUrl,
    });

    if (error)
      return NextResponse.json({ success: false, message: error.message });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}


// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.SUPABASE_SERVICE_ROLE_KEY!
//     );

//     const { slug, ...application } = body;

//     const { data: job } = await supabase
//       .from("job")
//       .select("id, title")
//       .eq("slug", slug)
//       .single();

//     const { data, error } = await supabase
//       .from("applications")
//       .insert({
//         job_id: job?.id,
//         job_slug: slug,
//         job_title: job?.title,
//         ...application,
//       })
//       .select();

//     if (error) return NextResponse.json({ success: false, message: error.message });

//     return NextResponse.json({ success: true, data });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, message: err.message });
//   }
// }
