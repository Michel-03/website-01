import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeIndianRupee, Briefcase, Check, Clock, MapPin } from "lucide-react";
import { descriptionBlocks, getOtherJobs, getPublicJob, postedLabel, skillDisplay } from "@/lib/jobFormat";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const job = await getPublicJob(slug);
  if (!job) return { title: "Role unavailable | Byte Analytics" };
  return {
    title: `${job.title} | Careers at Byte Analytics`,
    description: `${job.title}${job.location ? ` in ${job.location}` : ""}. Apply to join Byte Analytics.`,
  };
}

const hiringSteps = [
  { title: "Application", text: "Send your details and resume through this page." },
  { title: "Review", text: "The hiring team reads every application against the role." },
  { title: "Conversations", text: "Shortlisted candidates are invited to interviews." },
  { title: "Offer", text: "We share a decision and next steps with you." },
];

export default async function JobDetailPage(props: Props) {
  const { slug } = await props.params;
  const job = await getPublicJob(slug);

  if (!job) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#605BAD]">Careers</p>
        <h1 className="mt-3 text-4xl font-semibold text-[#221c4a]">This role is no longer open</h1>
        <p className="mt-4 text-gray-600">
          The position may have been filled or removed. Take a look at the roles we are hiring for right now.
        </p>
        <Link href="/careers#open-roles" className="mt-8 rounded-full bg-[#221c4a] px-6 py-3 text-sm font-semibold text-white">
          See open roles
        </Link>
      </section>
    );
  }

  const blocks = descriptionBlocks(job.description);
  const skills = skillDisplay(job.skills);
  const posted = postedLabel(job.created_at);
  const otherJobs = await getOtherJobs(slug);
  const facts = [
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Briefcase, label: "Experience", value: job.experience },
    { icon: BadgeIndianRupee, label: "Compensation", value: job.salary },
  ].filter((fact) => fact.value);

  return (
    <div className="bg-[#f7f6fb]">
      <section className="relative overflow-hidden bg-[#161326] text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#605BAD]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:pb-20">
          <Link href="/careers#open-roles" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft size={16} /> All open roles
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Careers at Byte Analytics</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">{job.title}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <span key={fact.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85">
                <fact.icon size={15} className="text-teal-300" />
                {fact.value}
              </span>
            ))}
            {posted && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85">
                <Clock size={15} className="text-teal-300" />
                {posted}
              </span>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/careers/${job.slug}/apply`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#161326] transition hover:bg-teal-100"
            >
              Apply for this role <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="space-y-8">
          <section className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-semibold text-[#221c4a]">About the role</h2>
            <div className="mt-5 space-y-5 text-[15px] leading-7 text-gray-700">
              {blocks.length === 0 && <p>The hiring team will share the full scope of this role during your first conversation.</p>}
              {blocks.map((block, index) =>
                block.type === "paragraph" ? (
                  <p key={index}>{block.text}</p>
                ) : (
                  <ul key={index} className="space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                          <Check size={13} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </section>

          {skills.items.length > 0 && (
            <section className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <h2 className="text-2xl font-semibold text-[#221c4a]">Skills we are looking for</h2>
              {skills.kind === "tags" ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.items.map((skill) => (
                    <span key={skill} className="rounded-full border border-[#605BAD]/20 bg-[#f4f3fb] px-4 py-2 text-sm font-medium text-[#221c4a]">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <ul className="mt-5 space-y-3 text-[15px] leading-7 text-gray-700">
                  {skills.items.map((skill) => (
                    <li key={skill} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#605BAD]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-semibold text-[#221c4a]">How hiring works</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {hiringSteps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-gray-100 p-5">
                  <span className="text-xs font-semibold text-[#605BAD]">Step {index + 1}</span>
                  <p className="mt-1 font-semibold text-[#221c4a]">{step.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#605BAD]">At a glance</p>
            <dl className="mt-5 space-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f4f3fb] text-[#605BAD]">
                    <fact.icon size={17} />
                  </span>
                  <div>
                    <dt className="text-xs text-gray-500">{fact.label}</dt>
                    <dd className="text-sm font-semibold text-[#221c4a]">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Link
              href={`/careers/${job.slug}/apply`}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#221c4a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#605BAD]"
            >
              Apply now <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-center text-xs text-gray-500">Takes about five minutes. Have your resume ready.</p>
          </div>

          {otherJobs.length > 0 && (
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#605BAD]">Other open roles</p>
              <ul className="mt-4 divide-y divide-gray-100">
                {otherJobs.map((other) => (
                  <li key={other.id}>
                    <Link href={`/careers/${other.slug}`} className="group flex items-center justify-between gap-3 py-3">
                      <span>
                        <span className="block text-sm font-semibold text-[#221c4a] group-hover:text-[#605BAD]">{other.title}</span>
                        <span className="text-xs text-gray-500">{[other.location, other.experience].filter(Boolean).join(" · ")}</span>
                      </span>
                      <ArrowRight size={15} className="text-gray-300 group-hover:text-[#605BAD]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
