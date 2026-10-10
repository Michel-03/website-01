"use client";

import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, ShieldCheck, UploadCloud, X } from "lucide-react";

type JobSummary = {
  title: string;
  slug: string;
  location?: string | null;
  experience?: string | null;
  salary?: string | null;
};

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx"];
const COVER_LIMIT = 2000;

const initialForm = {
  applicant_name: "",
  applicant_email: "",
  applicant_phone: "",
  current_role_name: "",
  total_experience: "",
  expected_salary: "",
  skills: "",
  cover_letter: "",
};

type FieldName = keyof typeof initialForm;
type Errors = Partial<Record<FieldName | "resume", string>>;

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function resumeProblem(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ACCEPTED_EXTENSIONS.includes(extension)) return "Upload a PDF or Word document.";
  if (file.size > MAX_BYTES) return "The file is larger than 5 MB.";
  return null;
}

function validate(form: typeof initialForm, resume: File | null): Errors {
  const errors: Errors = {};
  if (!form.applicant_name.trim()) errors.applicant_name = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(form.applicant_email.trim())) errors.applicant_email = "Enter a valid email address.";
  if (form.applicant_phone.replace(/\D/g, "").length < 7) errors.applicant_phone = "Enter a phone number we can reach you on.";
  if (!resume) errors.resume = "Attach your resume.";
  return errors;
}

export default function ApplicationForm({ job }: { job: JobSummary }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = event.target.name as FieldName;
    setForm((current) => ({ ...current, [name]: event.target.value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function pickFile(file: File | undefined) {
    if (!file) return;
    const problem = resumeProblem(file);
    if (problem) {
      setResume(null);
      setErrors((current) => ({ ...current, resume: problem }));
      return;
    }
    setResume(file);
    setErrors((current) => ({ ...current, resume: undefined }));
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    pickFile(event.dataTransfer.files?.[0]);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitError("");
    const found = validate(form, resume);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!consent) {
      setSubmitError("Please confirm that we may use your details for this application.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("slug", job.slug);
    data.append("resume", resume as File);
    for (const [key, value] of Object.entries(form)) data.append(key, value.trim());

    try {
      const response = await fetch("/api/applications", { method: "POST", body: data });
      const result = await response.json();
      if (!result.success) {
        setSubmitError(result.message || "Your application could not be sent. Please try again.");
        setLoading(false);
        return;
      }
      router.push(`/careers/${job.slug}/apply/success`);
    } catch {
      setSubmitError("We could not reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <Section number={1} title="About you" description="How we can reach you about this role.">
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="applicant_name" label="Full name" required error={errors.applicant_name} className="md:col-span-2">
              <input id="field-applicant_name" name="applicant_name" value={form.applicant_name} onChange={update} autoComplete="name" className={inputClass(errors.applicant_name)} />
            </Field>
            <Field name="applicant_email" label="Email" required error={errors.applicant_email}>
              <input id="field-applicant_email" type="email" name="applicant_email" value={form.applicant_email} onChange={update} autoComplete="email" className={inputClass(errors.applicant_email)} />
            </Field>
            <Field name="applicant_phone" label="Phone" required error={errors.applicant_phone}>
              <input id="field-applicant_phone" type="tel" name="applicant_phone" value={form.applicant_phone} onChange={update} autoComplete="tel" placeholder="+91" className={inputClass(errors.applicant_phone)} />
            </Field>
          </div>
        </Section>

        <Section number={2} title="Your experience" description="A quick picture of where you are today.">
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="current_role_name" label="Current role" hint="Or most recent">
              <input id="field-current_role_name" name="current_role_name" value={form.current_role_name} onChange={update} placeholder="e.g. Data Analyst" className={inputClass()} />
            </Field>
            <Field name="total_experience" label="Total experience">
              <input id="field-total_experience" name="total_experience" value={form.total_experience} onChange={update} placeholder="e.g. 3 years" className={inputClass()} />
            </Field>
            <Field name="expected_salary" label="Expected salary" hint={job.salary ? `Role range: ${job.salary}` : undefined}>
              <input id="field-expected_salary" name="expected_salary" value={form.expected_salary} onChange={update} placeholder="e.g. 6 LPA" className={inputClass()} />
            </Field>
            <Field name="skills" label="Key skills" hint="Separate with commas">
              <input id="field-skills" name="skills" value={form.skills} onChange={update} placeholder="e.g. Python, SQL, Power BI" className={inputClass()} />
            </Field>
          </div>
        </Section>

        <Section number={3} title="Resume" description="PDF or Word, up to 5 MB.">
          <div id="field-resume">
            {resume ? (
              <div className="flex items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50/60 p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                  <FileText size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#221c4a]">{resume.name}</p>
                  <p className="text-xs text-gray-500">{formatSize(resume.size)}</p>
                </div>
                <button type="button" onClick={() => setResume(null)} aria-label="Remove resume" className="rounded-lg p-2 text-gray-500 hover:bg-white">
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInput.current?.click()}
                onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && fileInput.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                  dragging ? "border-[#605BAD] bg-[#f4f3fb]" : errors.resume ? "border-red-300 bg-red-50/40" : "border-gray-200 hover:border-[#605BAD]/60 hover:bg-[#faf9fe]"
                }`}
              >
                <UploadCloud size={30} className="text-[#605BAD]" />
                <p className="mt-3 text-sm font-semibold text-[#221c4a]">Drop your resume here, or click to browse</p>
                <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX</p>
              </div>
            )}
            <input
              ref={fileInput}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(event) => {
                pickFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
            {errors.resume && <p className="mt-2 text-xs font-medium text-red-600">{errors.resume}</p>}
          </div>
        </Section>

        <Section number={4} title="Why this role" description="Optional, but it helps us understand you beyond the resume.">
          <textarea
            aria-label="Why this role"
            name="cover_letter"
            value={form.cover_letter}
            onChange={update}
            rows={6}
            maxLength={COVER_LIMIT}
            placeholder="Tell us what draws you to this role and what you would bring to the team."
            className={`${inputClass()} resize-y`}
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {form.cover_letter.length}/{COVER_LIMIT}
          </p>
        </Section>

        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-[#605BAD]" />
            <span>
              I confirm these details are accurate and agree that Byte Analytics may use them to assess my application, as described in the{" "}
              <a href="/privacy" target="_blank" className="font-semibold text-[#605BAD] underline-offset-2 hover:underline">
                privacy notice
              </a>
              .
            </span>
          </label>
          {submitError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#221c4a] py-3.5 text-sm font-semibold text-white transition hover:bg-[#605BAD] disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Sending your application…" : "Submit application"}
          </button>
        </div>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-white p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#605BAD]">You are applying for</p>
          <p className="mt-3 text-lg font-semibold text-[#221c4a]">{job.title}</p>
          <dl className="mt-4 space-y-2 text-sm">
            {job.location && <Summary label="Location" value={job.location} />}
            {job.experience && <Summary label="Experience" value={job.experience} />}
            {job.salary && <Summary label="Compensation" value={job.salary} />}
          </dl>
        </div>
        <div className="rounded-3xl bg-[#161326] p-7 text-white">
          <ShieldCheck size={22} className="text-teal-300" />
          <p className="mt-3 font-semibold">Your details stay private</p>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Your resume is stored privately and only the hiring team can open it.
          </p>
        </div>
      </aside>
    </form>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#221c4a] outline-none transition placeholder:text-gray-400 focus:ring-4 ${
    error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-[#605BAD] focus:ring-[#605BAD]/10"
  }`;
}

function Section({ number, title, description, children }: { number: number; title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f3fb] text-sm font-semibold text-[#605BAD]">{number}</span>
        <div>
          <h2 className="text-lg font-semibold text-[#221c4a]">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  name,
  label,
  hint,
  required,
  error,
  className = "",
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={`field-${name}`} className={`block ${className}`}>
      <span className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-[#221c4a]">
        <span>
          {label}
          {required && <span className="text-[#605BAD]"> *</span>}
        </span>
        {hint && <span className="text-xs font-normal text-gray-400">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right font-medium text-[#221c4a]">{value}</dd>
    </div>
  );
}
