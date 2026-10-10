"use client";

import Link from "next/link";
import { Briefcase, FilePlus, Link2, Mail, Users } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import LiveIndicator from "@/components/ui/LiveIndicator";
import ConnectionBanner from "@/components/admin/ConnectionBanner";
import PageHeader from "@/components/admin/PageHeader";

type Stats = { jobs: number; applications: number; messages: number; links: number };
type Activity = { id: string; kind: string; title: string; detail: string; href: string; at: string };

const metrics = [
  { key: "jobs", label: "Open roles", href: "/admin/job-list", icon: Briefcase },
  { key: "applications", label: "Applications", href: "/admin/applications/list", icon: Users },
  { key: "messages", label: "Inquiries", href: "/admin/contact-messages", icon: Mail },
  { key: "links", label: "Web links", href: "/admin/links", icon: Link2 },
] as const;

const kindStyles: Record<string, string> = {
  application: "bg-violet-100 text-violet-700",
  message: "bg-amber-100 text-amber-700",
  job: "bg-teal-100 text-teal-700",
};

function timeAgo(value: string) {
  const minutes = Math.round((Date.now() - new Date(value).getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function AdminDashboard() {
  const stats = useLiveData<Stats>("/api/admin/stats", {
    intervalMs: 5000,
    select: (payload) => (payload.success ? payload.stats : null),
  });
  const activity = useLiveData<Activity[]>("/api/admin/activity", {
    intervalMs: 5000,
    select: (payload) => (payload.success ? payload.items : null),
  });

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Operations"
        title="Dashboard"
        description="Careers, applications, inquiries, and website links, refreshed automatically."
        actions={
          <>
            <LiveIndicator status={stats.status} lastUpdated={stats.lastUpdated} onRefresh={stats.refresh} />
            <Link href="/admin/job-posting" className="inline-flex items-center gap-2 rounded-full bg-[#221c4a] px-4 py-2 text-sm font-semibold text-white">
              <FilePlus size={16} /> Post a job
            </Link>
          </>
        }
      />

      <ConnectionBanner />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const value = stats.data?.[metric.key];
          return (
            <Link key={metric.key} href={metric.href} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-sm">{metric.label}</span>
                <Icon size={18} className="text-[#605BAD]" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-[#221c4a]">
                {stats.loading ? "…" : value ?? "—"}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-[#221c4a]">Recent activity</h2>
          <LiveIndicator status={activity.status} lastUpdated={activity.lastUpdated} />
        </div>
        {activity.loading && <p className="px-6 py-8 text-sm text-gray-500">Loading activity…</p>}
        {!activity.loading && activity.error && (
          <p className="px-6 py-8 text-sm text-gray-500">Activity appears here once the database is connected.</p>
        )}
        {!activity.loading && !activity.error && activity.data?.length === 0 && (
          <p className="px-6 py-8 text-sm text-gray-500">No activity yet.</p>
        )}
        <ul>
          {activity.data?.map((item) => (
            <li key={item.id} className="border-b border-gray-50 last:border-b-0">
              <Link href={item.href} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${kindStyles[item.kind]}`}>{item.kind}</span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#221c4a]">{item.title}</span>
                  <span className="block text-xs text-gray-500">{item.detail}</span>
                </span>
                <span className="text-xs text-gray-400">{timeAgo(item.at)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
