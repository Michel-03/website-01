"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, FileText, Mail, Phone } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";

type Application = {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string | null;
  current_role_name?: string | null;
  total_experience?: string | null;
  expected_salary?: string | null;
  skills?: string | null;
  cover_letter?: string | null;
  resume_url?: string | null;
  job_title?: string | null;
  job_slug?: string | null;
  stage?: string | null;
  created_at: string;
};

const pipeline = [
  { id: "applied", label: "Applied", detail: "New submission, not yet read." },
  { id: "reviewed", label: "Reviewed", detail: "A reviewer has read the application." },
  { id: "shortlisted", label: "Shortlisted", detail: "Worth a conversation." },
  { id: "hired", label: "Hired", detail: "Offer accepted." },
];

const stageStyles: Record<string, string> = {
  applied: "bg-sky-100 text-sky-800",
  reviewed: "bg-violet-100 text-violet-800",
  shortlisted: "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-800",
  hired: "bg-emerald-100 text-emerald-800",
};

function skillsOf(value?: string | null) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ApplicationDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [application, setApplication] = useState<Application | null>(null);
  const [missing, setMissing] = useState("");
  const [stage, setStage] = useState("applied");
  const [saving, setSaving] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function loadApplication() {
      const response = await fetch(`/api/applications/get?id=${id}`);
      const data = await response.json();
      if (!data.success) {
        setMissing(data.message || "This application could not be loaded.");
        return;
      }
      setApplication(data.data);
      setStage(data.data.stage || "applied");
    }
    loadApplication();
  }, [id]);

  async function moveTo(nextStage: string) {
    if (!application || nextStage === stage || saving) return;
    const previous = stage;
    setStage(nextStage);
    setSaving(nextStage);
    setNotice("");
    setError("");

    const response = await fetch("/api/applications/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: application.id, stage: nextStage }),
    });
    const data = await response.json();
    setSaving("");

    if (!data.success) {
      setStage(previous);
      setError(data.message || "The stage could not be updated.");
      return;
    }

    setApplication({ ...application, stage: nextStage });
    setNotice(`Moved to ${nextStage}.`);
  }

  if (!id || missing) {
    return <p className="p-10 text-sm text-red-700">{missing || "This application link is incomplete."}</p>;
  }

  if (!application) return <p className="p-10 text-sm text-gray-500">Loading application…</p>;

  const skills = skillsOf(application.skills);
  const appliedOn = new Date(application.created_at).toLocaleString();
  const activeIndex = pipeline.findIndex((item) => item.id === stage);

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Talent review"
        title={application.applicant_name}
        description={`${application.job_title || "Open role"} · applied ${appliedOn}`}
        actions={
          <Link href="/admin/applications/list" className="text-sm font-semibold text-[#605BAD]">
            All applications
          </Link>
        }
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#221c4a]">Hiring stage</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${stageStyles[stage] ?? "bg-gray-100 text-gray-700"}`}>
                {stage}
              </span>
            </div>

            <ol className="mt-5 grid gap-2 md:grid-cols-4">
              {pipeline.map((item, index) => {
                const reached = activeIndex >= index && stage !== "rejected";
                const current = stage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => moveTo(item.id)}
                      disabled={Boolean(saving)}
                      className={`h-full w-full rounded-2xl border px-4 py-4 text-left transition disabled:opacity-60 ${
                        current
                          ? "border-[#221c4a] bg-[#221c4a] text-white"
                          : reached
                            ? "border-emerald-200 bg-emerald-50 text-[#221c4a]"
                            : "border-gray-200 bg-white text-[#221c4a] hover:border-[#605BAD]"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        {reached && !current && <Check size={14} />}
                        {saving === item.id ? "Saving…" : item.label}
                      </span>
                      <span className={`mt-1 block text-xs ${current ? "text-white/70" : "text-gray-500"}`}>{item.detail}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => moveTo("rejected")}
                disabled={Boolean(saving) || stage === "rejected"}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50"
              >
                {stage === "rejected" ? "Not moving forward" : "Mark as not moving forward"}
              </button>
              {notice && <p className="text-sm font-medium text-emerald-700">{notice}</p>}
              {error && <p className="text-sm font-medium text-red-700">{error}</p>}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#221c4a]">Experience</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-gray-400">Current role</dt>
                <dd className="mt-1 text-sm font-medium text-[#221c4a]">{application.current_role_name || "Not provided"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-gray-400">Experience</dt>
                <dd className="mt-1 text-sm font-medium text-[#221c4a]">{application.total_experience || "Not provided"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-gray-400">Expected pay</dt>
                <dd className="mt-1 text-sm font-medium text-[#221c4a]">{application.expected_salary || "Not provided"}</dd>
              </div>
            </dl>

            <h3 className="mt-8 text-sm font-semibold text-[#221c4a]">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.length === 0 && <p className="text-sm text-gray-500">No skills listed.</p>}
              {skills.map((skill) => (
                <span key={skill} className="rounded-full bg-[#f4f3fb] px-3 py-1 text-xs font-medium text-[#221c4a]">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="mt-8 text-sm font-semibold text-[#221c4a]">Cover letter</h3>
            <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-[#f7f6fb] p-5 text-sm leading-7 text-gray-700">
              {application.cover_letter?.trim() || "The candidate did not include a cover letter."}
            </p>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6">
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[#221c4a]">Contact</h2>
            <a href={`mailto:${application.applicant_email}`} className="mt-4 flex items-center gap-2 text-sm text-[#605BAD]">
              <Mail size={15} /> {application.applicant_email}
            </a>
            {application.applicant_phone && (
              <a href={`tel:${application.applicant_phone}`} className="mt-3 flex items-center gap-2 text-sm text-[#221c4a]">
                <Phone size={15} /> {application.applicant_phone}
              </a>
            )}
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[#221c4a]">Role</h2>
            <p className="mt-3 font-medium text-[#221c4a]">{application.job_title || "Untitled role"}</p>
            {application.job_slug && (
              <Link href={`/careers/${application.job_slug}`} className="mt-2 inline-flex text-sm font-semibold text-[#605BAD]">
                View public posting
              </Link>
            )}
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[#221c4a]">Resume</h2>
            {application.resume_url ? (
              <a
                href={application.resume_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#221c4a] px-4 py-2 text-sm font-semibold text-white"
              >
                <FileText size={15} /> Open resume
              </a>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No resume was uploaded.</p>
            )}
            <p className="mt-3 text-xs text-gray-400">Resume links expire after 30 minutes. Reload this page if a link stops opening.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
