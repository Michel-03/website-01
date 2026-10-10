"use client";

import { useState } from "react";
import Link from "next/link";
import Scene3D from "@/components/visual/Scene3D";

const studies = [
  {
    industry: "Finance",
    title: "Decision intelligence for a regulated lender",
    result: "Reduced manual review time while keeping an auditable approval trail.",
    href: "/ai-in-finance",
  },
  {
    industry: "Healthcare",
    title: "Operational AI for care coordination",
    result: "Connected fragmented records so teams could act on the same patient view.",
    href: "/ai-in-healthcare",
  },
  {
    industry: "Retail",
    title: "Demand sensing across stores and channels",
    result: "Gave merchandising a live signal instead of a weekly spreadsheet.",
    href: "/ai-in-retail",
  },
  {
    industry: "Industry",
    title: "Back-office automation for shared services",
    result: "Moved repeatable document work into governed workflows.",
    href: "/backoffice-automation",
  },
];

export default function CaseStudiesPage() {
  const [industry, setIndustry] = useState("All");
  const filters = ["All", ...Array.from(new Set(studies.map((study) => study.industry)))];
  const visible = studies.filter((study) => industry === "All" || study.industry === industry);

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#605BAD]">Proof</p>
          <h1 className="mt-3 text-5xl font-semibold text-[#221c4a]">Case studies</h1>
          <p className="mt-4 text-gray-600">
            Selected work from Byte Analytics engagements. Open an industry page to see the service behind each result.
          </p>
        </div>
        <div className="h-80 overflow-hidden rounded-[2rem] bg-white shadow-xl">
          <Scene3D />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setIndustry(filter)}
              className={`rounded-full px-4 py-2 text-sm ${
                industry === filter ? "bg-[#221c4a] text-white" : "bg-white text-[#221c4a]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {visible.map((study) => (
            <Link key={study.title} href={study.href} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs uppercase tracking-[0.16em] text-teal-700">{study.industry}</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#221c4a]">{study.title}</h2>
              <p className="mt-3 text-gray-600">{study.result}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
