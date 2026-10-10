"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import JobComposer, { emptyJobDraft, type JobDraft } from "@/components/admin/JobComposer";

export default function EditJobPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [draft, setDraft] = useState<JobDraft | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      const response = await fetch(`/api/job-list/${params.id}`);
      const data = await response.json();
      if (!data.success) {
        setError(data.error || "This role could not be loaded.");
        return;
      }
      setDraft({
        title: data.job.title ?? "",
        location: data.job.location ?? "",
        salary: data.job.salary ?? "",
        description: data.job.description ?? "",
        experience: data.job.experience ?? "",
        skills: data.job.skills ?? "",
        slug: data.job.slug ?? "",
      });
    }
    loadJob();
  }, [params.id]);

  if (error) return <p className="p-10 text-sm text-red-700">{error}</p>;
  if (!draft) return <p className="p-10 text-sm text-gray-500">Loading role…</p>;

  return (
    <JobComposer
      mode="edit"
      initial={draft}
      onSubmit={async (next) => {
        const response = await fetch(`/api/job-list/${params.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        const data = await response.json();
        if (data.success) router.refresh();
        return { success: Boolean(data.success), error: data.error };
      }}
    />
  );
}
