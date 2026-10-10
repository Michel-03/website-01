"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";

const groups = [
  {
    name: "AI Consultancy",
    description: "Decide where AI creates value before committing budget.",
    items: [
      { label: "AI Strategy", href: "/ai-strategy" },
      { label: "PoC Factory", href: "/poc-factory" },
      { label: "Consultancy", href: "/Consultancy" },
      { label: "Custom GPT", href: "/custom-gpt" },
    ],
  },
  {
    name: "AI Development",
    description: "Build and integrate AI that runs inside your environment.",
    items: [
      { label: "GenAI for Business", href: "/genai-for-business" },
      { label: "Agnostic AI", href: "/agnostic-ai" },
      { label: "AI Automation", href: "/automation" },
      { label: "Predictive Analytics", href: "/predictive-analysis" },
      { label: "Recommendation Systems", href: "/recommendation-systems" },
      { label: "Design Automation", href: "/design-automation" },
      { label: "Back-office Automation", href: "/backoffice-automation" },
    ],
  },
  {
    name: "Data Engineering",
    description: "Give every model and report trustworthy, governed data.",
    items: [
      { label: "Data Structuring", href: "/data-structuring" },
      { label: "Design Architecture", href: "/design-architecture" },
      { label: "MLOps", href: "/mlops" },
      { label: "Data Migration", href: "/data-migration" },
      { label: "Data Governance", href: "/data-governance" },
    ],
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? groups : groups.filter((group) => group.name === active);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Strategy, engineering, and operated AI under one roof."
        description="Byte Analytics works across AI, data science, data engineering, and automation on Databricks, AWS, Snowflake, Azure, UiPath, and MuleSoft."
        primary={{ label: "Talk to a consultant", href: "/contact" }}
        secondary={{ label: "How we work", href: "/how-we-work" }}
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap gap-2">
          {["All", ...groups.map((group) => group.name)].map((name) => (
            <button
              key={name}
              onClick={() => setActive(name)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${active === name ? "bg-[#221c4a] text-white" : "bg-white text-[#221c4a] shadow-sm"}`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-10">
          {visible.map((group) => (
            <div key={group.name}>
              <h2 className="text-2xl font-semibold text-[#221c4a]">{group.name}</h2>
              <p className="mt-1 text-gray-600">{group.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#605BAD]/30 hover:shadow-lg">
                    <span className="font-semibold text-[#221c4a]">{item.label}</span>
                    <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#605BAD]" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
