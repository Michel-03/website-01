"use client";

import { useRouter } from "next/navigation";
import JobComposer, { emptyJobDraft } from "@/components/admin/JobComposer";

export default function JobPosting() {
  const router = useRouter();

  return (
    <JobComposer
      mode="create"
      initial={emptyJobDraft}
      onSubmit={async (draft) => {
        const response = await fetch("/api/admin/post-job", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const result = await response.json();
        if (result.success) router.refresh();
        return { success: Boolean(result.success), error: result.error };
      }}
    />
  );
}
