"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Briefcase, Banknote, X } from "lucide-react";
import PageHeader from "./PageHeader";

export type JobDraft = {
  title: string;
  location: string;
  salary: string;
  description: string;
  experience: string;
  skills: string;
  slug: string;
};

export const emptyJobDraft: JobDraft = {
  title: "",
  location: "",
  salary: "",
  description: "",
  experience: "",
  skills: "",
  slug: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function skillList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#221c4a] outline-none transition focus:border-[#605BAD] focus:ring-4 focus:ring-[#605BAD]/10";

export default function JobComposer({
  initial,
  mode,
  onSubmit,
}: {
  initial: JobDraft;
  mode: "create" | "edit";
  onSubmit: (draft: JobDraft) => Promise<{ success: boolean; error?: string }>;
}) {
  const [draft, setDraft] = useState(initial);
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [skillInput, setSkillInput] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

  useEffect(() => {
    setDraft(initial);
    setSlugEdited(mode === "edit");
  }, [initial, mode]);

  useEffect(() => {
    async function loadLocations() {
      const response = await fetch("/api/job-list");
      const data = await response.json();
      if (!data.success) return;
      const values = Array.from(
        new Set(
          (data.jobs as { location?: string }[])
            .map((job) => job.location?.trim())
            .filter((value): value is string => Boolean(value))
        )
      );
      setLocations(values);
    }
    loadLocations();
  }, []);

  function update(name: keyof JobDraft, value: string) {
    setDraft((current) => {
      const next = { ...current, [name]: value };
      if (name === "title" && !slugEdited) next.slug = slugify(value);
      return next;
    });
    setPublishedSlug("");
  }

  function addSkill() {
    const next = skillInput.trim().replace(/,+$/, "");
    if (!next) return;
    const existing = skillList(draft.skills);
    if (!existing.some((item) => item.toLowerCase() === next.toLowerCase())) {
      update("skills", [...existing, next].join(", "));
    }
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    update(
      "skills",
      skillList(draft.skills)
        .filter((item) => item !== skill)
        .join(", ")
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setPublishedSlug("");

    const result = await onSubmit({
      ...draft,
      title: draft.title.trim(),
      location: draft.location.trim(),
      salary: draft.salary.trim(),
      description: draft.description.trim(),
      experience: draft.experience.trim(),
      skills: skillList(draft.skills).join(", "),
      slug: slugify(draft.slug),
    });

    setSaving(false);
    if (!result.success) {
      setError(result.error || "The role could not be saved.");
      return;
    }

    if (mode === "create") {
      setPublishedSlug(slugify(draft.slug));
      setDraft(emptyJobDraft);
      setSlugEdited(false);
      setSkillInput("");
    } else {
      setPublishedSlug(slugify(draft.slug));
    }
  }

  const skills = skillList(draft.skills);
  const previewPath = `/careers/${slugify(draft.slug) || "role-url"}`;

  return (
    <div className="p-6 md:p-10">
      <PageHeader
        eyebrow="Careers"
        title={mode === "create" ? "Post a role" : "Edit role"}
        description="This is what candidates see on the careers page. Publish only when the preview reads like a real opening."
        actions={
          <Link href="/admin/job-list" className="text-sm font-semibold text-[#605BAD]">
            All roles
          </Link>
        }
      />

      {publishedSlug && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          <p className="font-medium">
            {mode === "create" ? "The role is live." : "Changes are saved."} Candidates can open /careers/{publishedSlug}.
          </p>
          <a href={`/careers/${publishedSlug}`} target="_blank" rel="noreferrer" className="font-semibold underline">
            View public page
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#221c4a]">Role details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-[#221c4a]">Job title</span>
                <input
                  required
                  value={draft.title}
                  onChange={(event) => update("title", event.target.value)}
                  placeholder="Senior Data Engineer"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-[#221c4a]">Location</span>
                <input
                  required
                  list="job-locations"
                  value={draft.location}
                  onChange={(event) => update("location", event.target.value)}
                  placeholder="Hyderabad, or Remote"
                  className={fieldClass}
                />
                <datalist id="job-locations">
                  {locations.map((location) => (
                    <option key={location} value={location} />
                  ))}
                </datalist>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-[#221c4a]">Experience</span>
                <input
                  required
                  value={draft.experience}
                  onChange={(event) => update("experience", event.target.value)}
                  placeholder="3+ years"
                  className={fieldClass}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-[#221c4a]">Compensation</span>
                <input
                  required
                  value={draft.salary}
                  onChange={(event) => update("salary", event.target.value)}
                  placeholder="12–16 LPA, or Competitive"
                  className={fieldClass}
                />
                <span className="mt-1 block text-xs text-gray-500">Shown exactly as written on the public role page.</span>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#221c4a]">The work</h2>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-[#221c4a]">Description</span>
              <textarea
                required
                value={draft.description}
                onChange={(event) => update("description", event.target.value)}
                rows={8}
                placeholder={"What the person will own.\nWho they will work with.\nWhat a strong first six months looks like."}
                className={`${fieldClass} resize-y leading-6`}
              />
              <span className="mt-1 block text-xs text-gray-500">{draft.description.trim().length} characters</span>
            </label>

            <div className="mt-5">
              <span className="text-sm font-medium text-[#221c4a]">Skills</span>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === ",") {
                      event.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#605BAD]"
                />
                <button type="button" onClick={addSkill} className="rounded-xl bg-[#f4f3fb] px-4 text-sm font-semibold text-[#221c4a]">
                  Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.length === 0 && <p className="text-xs text-gray-500">Add at least one skill before publishing.</p>}
                {skills.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#221c4a] px-3 py-1 text-xs font-medium text-white"
                  >
                    {skill}
                    <X size={12} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#221c4a]">Public address</h2>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-[#221c4a]">URL slug</span>
              <div className="mt-1.5 flex overflow-hidden rounded-xl border border-gray-200 focus-within:border-[#605BAD] focus-within:ring-4 focus-within:ring-[#605BAD]/10">
                <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-500">/careers/</span>
                <input
                  required
                  value={draft.slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    update("slug", event.target.value);
                  }}
                  className="w-full bg-white px-2 py-2.5 text-sm outline-none"
                />
              </div>
              <span className="mt-1 block text-xs text-gray-500">Generated from the title. Change it only if this address should stay stable.</span>
            </label>
          </section>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled={saving || skills.length === 0}
              className="rounded-full bg-[#221c4a] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Publishing…" : mode === "create" ? "Publish role" : "Save changes"}
            </button>
            <Link href="/admin/job-list" className="px-3 py-3 text-sm font-semibold text-gray-500">
              Cancel
            </Link>
          </div>
        </div>

        <aside className="xl:sticky xl:top-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Candidate preview</p>
          <article className="mt-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Byte Analytics</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#221c4a]">{draft.title || "Role title"}</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2"><MapPin size={15} />{draft.location || "Location"}</p>
              <p className="flex items-center gap-2"><Briefcase size={15} />{draft.experience || "Experience"}</p>
              <p className="flex items-center gap-2"><Banknote size={15} />{draft.salary || "Compensation"}</p>
            </div>
            <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {draft.description || "The description appears here as candidates will read it."}
            </p>
            {skills.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#f4f3fb] px-3 py-1 text-xs font-medium text-[#221c4a]">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-6 truncate text-xs text-gray-400">{previewPath}</p>
          </article>
        </aside>
      </form>
    </div>
  );
}
