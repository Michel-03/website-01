import Link from "next/link";

export default function CtaBand({
  title = "Ready to put AI to work?",
  description = "Tell us about the decision or process you want to improve. Our team gets back to you within 24 hours.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#221c4a] px-8 py-12 text-white md:flex-row md:items-center md:px-12">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 max-w-xl text-white/70">{description}</p>
        </div>
        <Link href="/contact" className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#221c4a] transition hover:bg-teal-200">
          Book a consultation
        </Link>
      </div>
    </section>
  );
}
