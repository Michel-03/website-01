"use client";

import { useLiveData } from "@/lib/useLiveData";

type Health = {
  connected: boolean;
  configured: { supabaseUrl: boolean; serviceKey: boolean; realtimeKey: boolean };
  tables: Record<string, string>;
};

export default function ConnectionBanner() {
  const { data } = useLiveData<Health>("/api/health", {
    intervalMs: 30000,
    select: (payload) => (payload.success ? payload : null),
  });

  if (!data) return null;

  const missingTables = Object.entries(data.tables).filter(([, state]) => state !== "ok");

  if (!data.configured.supabaseUrl || (!data.configured.serviceKey && !data.configured.realtimeKey)) {
    return (
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">The database is not connected.</p>
        <p className="mt-1">
          Add the Supabase project URL and anon key to <code>.env.local</code>, then restart the site.
        </p>
      </div>
    );
  }

  if (!data.configured.serviceKey) {
    return (
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Read access is connected. Admin changes still need the service role key.</p>
        <p className="mt-1">
          Add <code>SUPABASE_SERVICE_ROLE_KEY</code> from Supabase → Project Settings → API so posting jobs, saving
          applications, and reading private inquiries succeed.
        </p>
      </div>
    );
  }

  if (missingTables.length) {
    return (
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Some database tables are missing.</p>
        <p className="mt-1">
          {missingTables.map(([table]) => table).join(", ")} could not be read. Run <code>supabase/schema.sql</code> in the
          Supabase SQL editor.
        </p>
      </div>
    );
  }

  if (!data.configured.realtimeKey) {
    return (
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        Data refreshes automatically every few seconds. Add <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to push public
        changes instantly.
      </div>
    );
  }

  return null;
}
