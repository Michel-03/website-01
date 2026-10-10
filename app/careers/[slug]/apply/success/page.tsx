import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getPublicJob } from "@/lib/jobFormat";

export const dynamic = "force-dynamic";

const nextSteps = [
  "The hiring team reviews your profile against the role.",
  "If there is a fit, we contact you by email or phone to arrange a conversation.",
  "Either way, we will let you know the outcome.",
];

export default async function SuccessPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const job = await getPublicJob(slug);

  return (
    <section className="flex min-h-[70vh] items-center bg-[#f7f6fb] px-6 py-20">
      <div className="mx-auto w-full max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-sm md:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <CheckCircle2 size={34} />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-[#221c4a] md:text-4xl">Application received</h1>
        <p className="mt-3 text-gray-600">
          Thank you for applying{job ? (
            <>
              {" "}for <strong className="text-[#221c4a]">{job.title}</strong>
            </>
          ) : null}
          .
        </p>
        <ol className="mx-auto mt-8 max-w-md space-y-3 text-left">
          {nextSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm text-gray-600">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4f3fb] text-xs font-semibold text-[#605BAD]">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/careers#open-roles" className="rounded-full bg-[#221c4a] px-6 py-3 text-sm font-semibold text-white">
            See other open roles
          </Link>
          <Link href="/" className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-[#221c4a]">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
