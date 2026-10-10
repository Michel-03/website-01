"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLiveData } from "@/lib/useLiveData";
import LiveIndicator from "@/components/ui/LiveIndicator";
import PageHeader from "@/components/admin/PageHeader";
import ConnectionBanner from "@/components/admin/ConnectionBanner";

type Application = {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  job_title?: string;
  job_slug?: string;
  stage?: string;
  total_experience?: string;
  resume_url?: string | null;
  created_at: string;
};

const stages = ["all", "applied", "reviewed", "shortlisted", "rejected", "hired"];
const stageStyles: Record<string, string> = {
  applied: "bg-sky-100 text-sky-700",
  reviewed: "bg-violet-100 text-violet-700",
  shortlisted: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-emerald-100 text-emerald-700",
};

export default function AdminApplicationsPage() {
  const { data, loading, error, status, lastUpdated, refresh } = useLiveData<Application[]>("/api/applications/list", {
    intervalMs: 5000,
    select: (payload) => (payload.success ? payload.data ?? [] : null),
  });
  const [stage, setStage] = useState("all");
  const [query, setQuery] = useState("");
  const applications = data ?? [];

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: applications.length };
    for (const app of applications) result[app.stage ?? "applied"] = (result[app.stage ?? "applied"] ?? 0) + 1;
    return result;
  }, [applications]);

  const visible = applications.filter((app) => {
    const matchesStage = stage === "all" || (app.stage ?? "applied") === stage;
    const matchesQuery = `${app.applicant_name} ${app.applicant_email} ${app.job_title ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesStage && matchesQuery;
  });

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Talent"
        title="Applications"
        description="New applications appear here automatically."
        actions={<LiveIndicator status={status} lastUpdated={lastUpdated} onRefresh={refresh} />}
      />
      <ConnectionBanner />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {stages.map((item) => (
          <button
            key={item}
            onClick={() => setStage(item)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
              stage === item ? "bg-[#221c4a] text-white" : "bg-white text-gray-600 shadow-sm"
            }`}
          >
            {item} <span className="opacity-60">{counts[item] ?? 0}</span>
          </button>
        ))}
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search candidates"
          className="ml-auto w-full max-w-xs rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#605BAD]"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-3">Candidate</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Stage</th>
              <th className="hidden px-5 py-3 md:table-cell">Experience</th>
              <th className="hidden px-5 py-3 md:table-cell">Applied</th>
              <th className="px-5 py-3 text-right">Resume</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="px-5 py-8 text-gray-500">Loading applications…</td></tr>}
            {!loading && error && <tr><td colSpan={6} className="px-5 py-8 text-gray-500">{error}</td></tr>}
            {!loading && !error && visible.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-gray-500">No applications found.</td></tr>}
            {visible.map((app) => (
              <tr key={app.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-5 py-4">
                  <Link href={`/admin/applications/${app.id}`} className="font-semibold text-[#221c4a] hover:text-[#605BAD]">{app.applicant_name}</Link>
                  <p className="text-xs text-gray-500">{app.applicant_email}</p>
                </td>
                <td className="px-5 py-4 text-gray-700">{app.job_title || app.job_slug || "—"}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${stageStyles[app.stage ?? "applied"] ?? "bg-gray-100 text-gray-600"}`}>
                    {app.stage ?? "applied"}
                  </span>
                </td>
                <td className="hidden px-5 py-4 text-gray-600 md:table-cell">{app.total_experience || "—"}</td>
                <td className="hidden px-5 py-4 text-gray-600 md:table-cell">{new Date(app.created_at).toLocaleDateString()}</td>
                <td className="px-5 py-4 text-right">
                  {app.resume_url ? (
                    <a href={app.resume_url} target="_blank" rel="noreferrer" className="font-semibold text-[#605BAD]">Open</a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
