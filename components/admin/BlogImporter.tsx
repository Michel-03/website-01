"use client";

import { FormEvent, useEffect, useState } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import PageHeader from "./PageHeader";

type Draft = {
  sourceUrl: string;
  title: string;
  author: string;
  publishedAt: string;
  publishedLabel: string;
  excerpt: string;
  coverImage: string;
  content: string;
  readTime: string;
  partial: boolean;
  featured: boolean;
};

type SavedPost = {
  id: number;
  title: string;
  slug: string;
  author?: string | null;
  published_at?: string | null;
  source_url?: string | null;
};

const empty = {
  sourceUrl: "",
  title: "",
  author: "",
  publishedAt: "",
  publishedLabel: "",
  excerpt: "",
  coverImage: "",
  content: "",
  readTime: "",
  partial: false,
  featured: false,
};

export default function BlogImporter() {
  const [url, setUrl] = useState("");
  const [draft, setDraft] = useState<Draft>(empty);
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  async function loadPosts() {
    const response = await fetch("/api/admin/blogs");
    const data = await response.json();
    if (data.success) {
      setPosts(data.posts ?? []);
      return;
    }
    setError(data.error || "Imported articles could not be loaded.");
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function fetchArticle(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setNotice("");
    const response = await fetch("/api/admin/blogs/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setLoading(false);
    if (!data.success) {
      setError(data.error || "The article could not be fetched.");
      return;
    }
    setDraft({ ...data.article, featured: false });
    setNotice("Article fetched. Review it, then publish it on the site.");
  }

  async function publish() {
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const data = await response.json();
    setSaving(false);
    if (!data.success) {
      setError(data.error || "The article could not be published.");
      return;
    }
    setNotice(data.updated ? "This article was already on the site. It has been refreshed." : "Published on the blog.");
    setDraft(empty);
    setUrl("");
    loadPosts();
  }

  async function remove(id: number) {
    const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    const data = await response.json();
    setPendingDelete(null);
    setNotice(data.success ? "Article removed from the site." : data.error || "The article could not be removed.");
    loadPosts();
  }

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Content"
        title="Blog"
        description="Paste a public LinkedIn article link. The title, cover, and article text are fetched so you can publish them here."
      />

      {notice && <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p>}
      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={fetchArticle} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <label className="block">
          <span className="text-sm font-medium text-[#221c4a]">LinkedIn article link</span>
          <input
            required
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://www.linkedin.com/pulse/…"
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]"
          />
        </label>
        <p className="mt-2 text-xs text-gray-500">
          Use the article address that contains /pulse/. A normal LinkedIn post that asks people to sign in cannot be imported.
        </p>
        <button disabled={loading} className="mt-4 rounded-full bg-[#221c4a] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {loading ? "Fetching article…" : "Fetch article"}
        </button>
      </form>

      {draft.title && (
        <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            {draft.coverImage ? (
              <img src={draft.coverImage} alt="" className="h-40 w-full rounded-2xl object-cover" />
            ) : (
              <div className="flex h-40 items-center justify-center rounded-2xl bg-[#f4f3fb] text-xs text-gray-400">No cover image</div>
            )}
            <div className="grid gap-4">
              <label className="block">
                <span className="text-sm font-medium text-[#221c4a]">Title</span>
                <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-[#221c4a]">Author</span>
                  <input value={draft.author} onChange={(event) => setDraft({ ...draft, author: event.target.value })} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-[#221c4a]">Published</span>
                  <input type="date" value={draft.publishedAt} onChange={(event) => setDraft({ ...draft, publishedAt: event.target.value })} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
                </label>
              </div>
            </div>
          </div>

          {draft.partial && (
            <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
              LinkedIn only returned a short summary. You can paste the rest of the article below before publishing.
            </p>
          )}

          <label className="mt-4 block">
            <span className="text-sm font-medium text-[#221c4a]">Summary</span>
            <textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} rows={2} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]" />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-[#221c4a]">Article</span>
            <textarea value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} rows={16} className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 font-mono text-sm leading-6 outline-none focus:border-[#605BAD]" />
          </label>
          <label className="mt-4 flex items-center gap-2 text-sm text-[#221c4a]">
            <input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} className="h-4 w-4 accent-[#605BAD]" />
            Show in the featured section
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={publish} disabled={saving} className="rounded-full bg-[#221c4a] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Publishing…" : "Publish on the site"}
            </button>
            <a href={draft.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-[#605BAD]">
              Open on LinkedIn <ExternalLink size={14} />
            </a>
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-[#221c4a]">Imported articles</h2>
        <div className="mt-3 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          {posts.length === 0 && <p className="px-5 py-8 text-sm text-gray-500">No LinkedIn articles published yet.</p>}
          {posts.map((post) => (
            <div key={post.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 last:border-b-0">
              <div>
                <p className="font-semibold text-[#221c4a]">{post.title}</p>
                <p className="text-xs text-gray-500">{post.author || "LinkedIn"}{post.published_at ? ` · ${post.published_at}` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#605BAD] hover:bg-violet-50">View</a>
                {pendingDelete === post.id ? (
                  <button onClick={() => remove(post.id)} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-red-700">Confirm</button>
                ) : (
                  <button onClick={() => setPendingDelete(post.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" title="Remove">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
