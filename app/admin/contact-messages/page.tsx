"use client";

import { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { useLiveData } from "@/lib/useLiveData";
import LiveIndicator from "@/components/ui/LiveIndicator";
import PageHeader from "@/components/admin/PageHeader";
import ConnectionBanner from "@/components/admin/ConnectionBanner";

type Message = {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
};

function displayName(message: Message) {
  return [message.first_name, message.last_name].filter(Boolean).join(" ") || message.name || message.email;
}

export default function ContactMessagesPage() {
  const { data, loading, error, status, lastUpdated, refresh } = useLiveData<Message[]>("/api/contact-messages", {
    intervalMs: 5000,
    select: (payload) => (payload.success ? payload.messages ?? [] : null),
  });
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [notice, setNotice] = useState("");

  async function deleteMessage(message: Message) {
    const response = await fetch(`/api/contact-messages/${message.id}`, { method: "DELETE" });
    const result = await response.json();
    setConfirming(false);
    setSelectedId(null);
    setNotice(result.success ? "Inquiry removed." : result.error || "The inquiry could not be removed.");
    refresh();
  }

  const messages = (data ?? []).filter((message) =>
    `${displayName(message)} ${message.email} ${message.message}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Sales"
        title="Inquiries"
        description="Messages from the contact forms, newest first."
        actions={<LiveIndicator status={status} lastUpdated={lastUpdated} onRefresh={refresh} />}
      />
      <ConnectionBanner />
      {notice && <p className="mb-4 rounded-xl bg-white px-4 py-3 text-sm shadow-sm">{notice}</p>}

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search inquiries"
        className="mb-4 w-full max-w-sm rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#605BAD]"
      />

      {loading && <p className="text-sm text-gray-500">Loading inquiries…</p>}
      {!loading && error && <p className="text-sm text-gray-500">{error}</p>}
      {!loading && !error && messages.length === 0 && (
        <p className="rounded-3xl bg-white p-8 text-sm text-gray-500 shadow-sm">No inquiries found.</p>
      )}

      {messages.length > 0 && (
        <div className="grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            {messages.map((message) => {
              const selected = (selectedId ?? messages[0]?.id) === message.id;
              return (
                <button
                  key={message.id}
                  onClick={() => {
                    setSelectedId(message.id);
                    setConfirming(false);
                  }}
                  className={`block w-full border-b border-gray-100 px-4 py-4 text-left last:border-b-0 ${selected ? "bg-[#f4f3fb]" : "hover:bg-gray-50"}`}
                >
                  <span className="block font-semibold text-[#221c4a]">{displayName(message)}</span>
                  <span className="mt-1 block truncate text-xs text-gray-500">{message.message}</span>
                </button>
              );
            })}
          </div>

          {(() => {
            const message = messages.find((item) => item.id === (selectedId ?? messages[0]?.id)) ?? messages[0];
            return (
              <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#221c4a]">{displayName(message)}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {message.email}
                      {message.phone ? ` · ${message.phone}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(message.created_at).toLocaleString()}</span>
                </div>
                <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-gray-700">{message.message}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={`mailto:${message.email}?subject=Byte%20Analytics`} className="inline-flex items-center gap-1.5 rounded-full bg-[#221c4a] px-4 py-2 text-sm font-semibold text-white">
                    <Mail size={14} /> Reply by email
                  </a>
                  {confirming ? (
                    <button onClick={() => deleteMessage(message)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">
                      Confirm removal
                    </button>
                  ) : (
                    <button onClick={() => setConfirming(true)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>
              </article>
            );
          })()}
        </div>
      )}
    </div>
  );
}
