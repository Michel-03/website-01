"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Briefcase, Clock, Search } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import LiveIndicator from "@/components/ui/LiveIndicator";

type Job = {
  id: string | number;
  title: string;
  slug: string;
  salary?: string;
  location?: string;
  department?: string;
  experience?: string;
  skills?: string;
  created_at?: string;
};

function postedLabel(value?: string) {
  if (!value) return "";
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86400000);
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  if (days < 30) return `Posted ${days} days ago`;
  return `Posted ${new Date(value).toLocaleDateString()}`;
}

export default function CareersJobList() {
  const { data, error, loading, status, lastUpdated, refresh } = useLiveData<Job[]>("/api/jobs", {
    intervalMs: 10000,
    realtimeTables: ["job"],
    select: (payload) => (payload.success ? payload.data ?? [] : null),
  });
  const jobs = data ?? [];
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All locations");
  const [department, setDepartment] = useState("All teams");

  const locations = useMemo(
    () => ["All locations", ...Array.from(new Set(jobs.map((job) => job.location).filter((v): v is string => Boolean(v))))],
    [jobs]
  );
  const departments = useMemo(
    () => ["All teams", ...Array.from(new Set(jobs.map((job) => job.department).filter((v): v is string => Boolean(v))))],
    [jobs]
  );

  const visibleJobs = jobs.filter((job) => {
    const haystack = `${job.title} ${job.department ?? ""} ${job.skills ?? ""}`.toLowerCase();
    return (
      haystack.includes(query.toLowerCase().trim()) &&
      (location === "All locations" || job.location === location) &&
      (department === "All teams" || job.department === department)
    );
  });

  return (
    <section id="open-roles" className="bg-[#f7f6fb] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605BAD]">Open positions</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#221c4a]">
              {loading ? "Loading roles" : `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}`}
            </h2>
          </div>
          <LiveIndicator status={status} lastUpdated={lastUpdated} onRefresh={refresh} />
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl border border-gray-200 bg-white p-3 md:grid-cols-[1.6fr_1fr_1fr]">
          <label className="flex items-center gap-2 rounded-xl bg-gray-50 px-3">
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, team, or skill"
              className="w-full bg-transparent py-2.5 text-sm outline-none"
            />
          </label>
          <select value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded-xl bg-gray-50 px-3 py-2.5 text-sm outline-none">
            {departments.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-xl bg-gray-50 px-3 py-2.5 text-sm outline-none">
            {locations.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        {loading && (
          <div className="mt-6 grid gap-3">
            {[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-white" />)}
          </div>
        )}

        {!loading && error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-white p-6">
            <p className="font-semibold text-[#221c4a]">Open roles are temporarily unavailable.</p>
            <p className="mt-1 text-sm text-gray-600">{error}</p>
            <Link href="/contact" className="mt-3 inline-flex text-sm font-semibold text-[#605BAD]">Contact talent team</Link>
          </div>
        )}

        {!loading && !error && visibleJobs.length === 0 && (
          <p className="mt-6 rounded-2xl bg-white p-6 text-gray-600">
            {jobs.length ? "No roles match those filters." : "There are no open roles right now. New positions appear here the moment they are published."}
          </p>
        )}

        <div className="mt-6 grid gap-3">
          {visibleJobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.slug}`}
              className="group grid gap-4 rounded-2xl border border-transparent bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#605BAD]/25 hover:shadow-lg md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">{job.department || "Byte Analytics"}</p>
                <h3 className="mt-1 text-xl font-semibold text-[#221c4a] group-hover:text-[#605BAD]">{job.title}</h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{job.location || "Flexible"}</span>
                  <span className="inline-flex items-center gap-1.5"><Briefcase size={14} />{job.experience || "Experience discussed"}</span>
                  {job.created_at && <span className="inline-flex items-center gap-1.5"><Clock size={14} />{postedLabel(job.created_at)}</span>}
                </div>
              </div>
              <span className="inline-flex justify-center rounded-full bg-[#221c4a] px-5 py-2 text-sm font-semibold text-white">View role</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
