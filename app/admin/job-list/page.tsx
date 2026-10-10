"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import LiveIndicator from "@/components/ui/LiveIndicator";
import PageHeader from "@/components/admin/PageHeader";
import ConnectionBanner from "@/components/admin/ConnectionBanner";

type Job = {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  salary?: string;
  created_at?: string;
};

export default function JobList() {
  const { data, loading, error, status, lastUpdated, refresh } = useLiveData<Job[]>("/api/job-list", {
    intervalMs: 5000,
    select: (payload) => (payload.success ? payload.jobs ?? [] : null),
  });
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  async function deleteJob(job: Job) {
    const response = await fetch(`/api/job-list/${job.id}`, { method: "DELETE" });
    const result = await response.json();
    setPendingDelete(null);
    setNotice(result.success ? `"${job.title}" was removed.` : result.error || "The job could not be removed.");
    refresh();
  }

  const jobs = (data ?? []).filter((job) =>
    `${job.title} ${job.department ?? ""} ${job.location ?? ""}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Careers"
        title="Jobs"
        description="Every role here is live on the public careers page."
        actions={
          <>
            <LiveIndicator status={status} lastUpdated={lastUpdated} onRefresh={refresh} />
            <Link href="/admin/job-posting" className="rounded-full bg-[#221c4a] px-4 py-2 text-sm font-semibold text-white">Post a job</Link>
          </>
        }
      />
      <ConnectionBanner />
      {notice && <p className="mb-4 rounded-xl bg-white px-4 py-3 text-sm text-[#221c4a] shadow-sm">{notice}</p>}

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search jobs"
        className="mb-4 w-full max-w-sm rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#605BAD]"
      />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-3">Role</th>
              <th className="hidden px-5 py-3 md:table-cell">Location</th>
              <th className="hidden px-5 py-3 lg:table-cell">Posted</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="px-5 py-8 text-gray-500">Loading jobs…</td></tr>}
            {!loading && error && <tr><td colSpan={4} className="px-5 py-8 text-gray-500">{error}</td></tr>}
            {!loading && !error && jobs.length === 0 && <tr><td colSpan={4} className="px-5 py-8 text-gray-500">No jobs found.</td></tr>}
            {jobs.map((job) => (
              <tr key={job.id} className="border-t border-gray-100">
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#221c4a]">{job.title}</p>
                  <p className="text-xs text-gray-500">/careers/{job.slug}</p>
                </td>
                <td className="hidden px-5 py-4 text-gray-600 md:table-cell">{job.location || "—"}</td>
                <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">
                  {job.created_at ? new Date(job.created_at).toLocaleDateString() : "—"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <a href={`/careers/${job.slug}`} target="_blank" rel="noreferrer" title="View public page" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"><ExternalLink size={16} /></a>
                    <Link href={`/admin/job-list/edit/${job.id}`} title="Edit" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"><Pencil size={16} /></Link>
                    {pendingDelete === job.id ? (
                      <button onClick={() => deleteJob(job)} className="rounded-lg px-2 text-xs font-semibold text-red-700">Remove</button>
                    ) : (
                      <button onClick={() => setPendingDelete(job.id)} title="Delete" className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
