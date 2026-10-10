"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { defaultSiteLinks, type SiteLink } from "@/lib/siteLinks";
import PageHeader from "./PageHeader";

const groups = ["Company", "Services", "Industries"];

const emptyForm = {
  label: "",
  href: "",
  group_name: "Company",
  sort_order: "100",
};

export default function LinksManager() {
  const [links, setLinks] = useState<SiteLink[]>([]);
  const [source, setSource] = useState("fallback");
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<SiteLink["id"] | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SiteLink["id"] | null>(null);

  async function loadLinks() {
    const response = await fetch("/api/links");
    const data = await response.json();
    setLinks(data.links ?? defaultSiteLinks);
    setSource(data.source ?? "fallback");
    setWarning(data.warning ?? "");
  }

  useEffect(() => {
    loadLinks();
  }, []);

  const visible = useMemo(
    () =>
      links.filter((link) =>
        `${link.label} ${link.href} ${link.group_name}`.toLowerCase().includes(query.toLowerCase())
      ),
    [links, query]
  );

  function report(data: { success?: boolean; error?: string }, successText: string) {
    if (data.success) {
      setMessage(successText);
      setError("");
      loadLinks();
      return;
    }
    setError(data.error || "That change could not be saved.");
    setMessage("");
  }

  async function publishDefaults() {
    const response = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seed: true }),
    });
    report(await response.json(), "The built-in directory is now saved in the database.");
  }

  async function saveLink(event: FormEvent) {
    event.preventDefault();
    const payload = {
      ...form,
      sort_order: Number(form.sort_order) || 0,
      is_active: true,
    };
    const response = await fetch(editingId ? `/api/links/${editingId}` : "/api/links", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.success) {
      setForm(emptyForm);
      setEditingId(null);
    }
    report(data, editingId ? "Link updated." : "Link added.");
  }

  function startEdit(link: SiteLink) {
    if (!link.id) return;
    setEditingId(link.id);
    setForm({
      label: link.label,
      href: link.href,
      group_name: link.group_name,
      sort_order: String(link.sort_order ?? 0),
    });
    setPendingDelete(null);
  }

  async function toggleLink(link: SiteLink) {
    if (!link.id) return;
    const response = await fetch(`/api/links/${link.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...link, is_active: link.is_active === false }),
    });
    report(await response.json(), link.is_active === false ? "Link is visible on the site." : "Link is hidden from the site.");
  }

  async function removeLink(id: SiteLink["id"]) {
    const response = await fetch(`/api/links/${id}`, { method: "DELETE" });
    setPendingDelete(null);
    report(await response.json(), "Link removed.");
  }

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Site"
        title="Web links"
        description={
          source === "database"
            ? "The footer and homepage directory read these links from the database."
            : "The public site is still using the built-in directory. Publish it once to manage links here."
        }
        actions={
          source !== "database" || links.length === 0 ? (
            <button onClick={publishDefaults} className="rounded-full bg-[#221c4a] px-4 py-2 text-sm font-semibold text-white">
              Publish built-in links
            </button>
          ) : undefined
        }
      />

      {warning && (
        <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {warning}. Run supabase/site_links.sql in the Supabase SQL editor, then publish the built-in links.
        </p>
      )}
      {message && <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={saveLink} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#221c4a]">{editingId ? "Edit link" : "Add a link"}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-[#221c4a]">Label</span>
            <input required value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value })} placeholder="Careers" className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#221c4a]">Address</span>
            <input required value={form.href} onChange={(event) => setForm({ ...form, href: event.target.value })} placeholder="/careers or https://" className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#221c4a]">Group</span>
            <input list="link-groups" value={form.group_name} onChange={(event) => setForm({ ...form, group_name: event.target.value })} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
            <datalist id="link-groups">
              {groups.map((group) => <option key={group} value={group} />)}
            </datalist>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#221c4a]">Order</span>
            <input type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: event.target.value })} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button className="rounded-full bg-[#221c4a] px-5 py-2.5 text-sm font-semibold text-white">
            {editingId ? "Save changes" : "Add link"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="px-3 text-sm font-semibold text-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search links"
          className="mb-3 w-full max-w-sm rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#605BAD]"
        />
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          {visible.length === 0 && <p className="px-5 py-8 text-sm text-gray-500">No links match that search.</p>}
          {visible.map((link) => (
            <div key={`${link.id ?? "local"}-${link.href}-${link.label}`} className="grid gap-3 border-b border-gray-100 px-5 py-4 last:border-b-0 md:grid-cols-[1.2fr_1.4fr_auto] md:items-center">
              <div>
                <p className="font-semibold text-[#221c4a]">{link.label}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-gray-400">
                  {link.group_name} · {link.id ? (link.is_active === false ? "Hidden" : "Visible") : "Not saved"}
                </p>
              </div>
              <p className="truncate text-sm text-gray-600">{link.href}</p>
              {link.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleLink(link)} title={link.is_active === false ? "Show" : "Hide"} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                    {link.is_active === false ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => startEdit(link)} title="Edit" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                    <Pencil size={16} />
                  </button>
                  {pendingDelete === link.id ? (
                    <button onClick={() => removeLink(link.id)} className="rounded-lg px-2 py-1 text-xs font-semibold text-red-700">
                      Confirm
                    </button>
                  ) : (
                    <button onClick={() => setPendingDelete(link.id)} title="Remove" className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-xs text-gray-400">Publish the directory to edit these</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
