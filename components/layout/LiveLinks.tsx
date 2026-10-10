"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSiteLinks } from "@/lib/useSiteLinks";

export default function LiveLinks() {
  const { links } = useSiteLinks();
  const visible = links.filter((link) => link.is_active !== false).slice(0, 8);

  return (
    <section className="bg-[#f7f6fb]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#605BAD]">Explore</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#221c4a]">Where would you like to start?</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="group flex items-center justify-between rounded-2xl border border-[#605BAD]/10 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-1 hover:border-[#605BAD]/30 hover:shadow-lg"
            >
              <span>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-teal-700">{link.group_name}</span>
                <span className="mt-1 block font-semibold text-[#221c4a]">{link.label}</span>
              </span>
              <ArrowUpRight size={18} className="text-gray-300 transition group-hover:text-[#605BAD]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
