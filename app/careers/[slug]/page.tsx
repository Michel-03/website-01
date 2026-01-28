import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function JobDetailPage(props: any) {
  const params = await props.params; // FIX: unwrap params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("job") // <--- your table name
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!data) {
    return <div className="p-10">Job not found.</div>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>

      <p className="text-gray-700 mb-2"><strong>Department:</strong> {data.department}</p>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {data.location}</p>
      <p className="text-gray-700 mb-2"><strong>Experience:</strong> {data.experience}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Job Description</h2>
      <p className="text-gray-800 whitespace-pre-wrap">{data.description}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Skills</h2>
      <p className="text-gray-800 whitespace-pre-wrap">{data.skills}</p>

      <p className="text-sm text-gray-500 mt-6">
        Posted on: {new Date(data.created_at).toLocaleDateString()}
      </p>

      <Link
        href={`/careers/${data.slug}/apply`}
        className="mt-6 inline-block bg-[#605BAD] text-white px-6 py-3 rounded-lg hover:bg-[#4c47a5]"
      >
        Apply Now
      </Link>
    </div>
  );
}
