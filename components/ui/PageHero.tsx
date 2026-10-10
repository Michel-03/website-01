import Link from "next/link";
import Scene3D from "@/components/visual/Scene3D";

export default function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#605BAD]">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#221c4a] md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">{description}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && (
                <Link href={primary.href} className="rounded-full bg-[#221c4a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#221c4a]/20 transition hover:bg-[#605BAD]">
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="rounded-full border border-[#221c4a]/15 bg-white px-6 py-3 text-sm font-semibold text-[#221c4a] transition hover:border-[#605BAD]">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="relative hidden h-80 overflow-hidden rounded-[2rem] border border-white bg-white/70 shadow-2xl shadow-[#605BAD]/10 md:block">
          <Scene3D />
        </div>
      </div>
    </section>
  );
}
