"use client";

import Link from "next/link";
import { groupLinks } from "@/lib/siteLinks";
import { useSiteLinks } from "@/lib/useSiteLinks";

export default function Footer() {
  const { links } = useSiteLinks();
  const groups = groupLinks(links);

  return (
    <footer className="border-t border-white/10 bg-[#141226] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-teal-300">
            Byte Analytics
          </p>
          <h2 className="mt-3 max-w-sm text-2xl font-semibold">
            Intelligence for organizations that cannot afford guesswork.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            Strategy, engineering, and operated AI systems for leadership teams.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#221c4a]"
          >
            Start a conversation
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.name}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                {group.name}
              </p>
              <ul className="mt-4 space-y-2">
                {group.items.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition hover:text-teal-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Byte Analytics. All rights reserved.
      </div>
    </footer>
  );
}
