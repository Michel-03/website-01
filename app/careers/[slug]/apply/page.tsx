import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ApplicationForm from "@/components/carrers/ApplicationForm";
import { getPublicJob } from "@/lib/jobFormat";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const job = await getPublicJob(slug);
  return { title: job ? `Apply: ${job.title} | Byte Analytics` : "Role unavailable | Byte Analytics" };
}

export default async function ApplyJobPage(props: Props) {
  const { slug } = await props.params;
  const job = await getPublicJob(slug);

  if (!job) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold text-[#221c4a]">This role is no longer open</h1>
        <p className="mt-4 text-gray-600">Applications for this position have closed.</p>
        <Link href="/careers#open-roles" className="mt-8 rounded-full bg-[#221c4a] px-6 py-3 text-sm font-semibold text-white">
          See open roles
        </Link>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6fb]">
      <section className="bg-[#161326] text-white">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-10">
          <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft size={16} /> Back to the role
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Application</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{job.title}</h1>
          <p className="mt-2 text-sm text-white/70">{[job.location, job.experience, job.salary].filter(Boolean).join(" · ")}</p>
        </div>
      </section>
      <ApplicationForm job={{ title: job.title, slug: job.slug, location: job.location, experience: job.experience, salary: job.salary }} />
    </div>
  );
}
