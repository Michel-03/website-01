"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";

const phases = [
  {
    name: "AI discovery session",
    summary: "Identify opportunities to transform your business with AI, calculate ROI, and prioritise use cases.",
    outputs: ["Ranked use-case shortlist", "ROI estimate per use case", "Data readiness view"],
  },
  {
    name: "AI scoping programme",
    summary: "Build a robust AI strategy, predict and mitigate risk factors, and develop a detailed roadmap.",
    outputs: ["Delivery roadmap", "Risk register", "Architecture outline"],
  },
  {
    name: "Proof of concept",
    summary: "Validate that a solution will work by building the simplest possible version of your product.",
    outputs: ["Working prototype", "Measured results against success criteria", "Go / no-go recommendation"],
  },
  {
    name: "Minimum viable product",
    summary: "Turn the proof of concept into the simplest usable version that can be beta-tested by real users.",
    outputs: ["Production-grade release", "User feedback loop", "Monitoring in place"],
  },
  {
    name: "Ongoing maintenance",
    summary: "Maintain and enhance your product with continuous updates and the latest AI technology.",
    outputs: ["Model and data monitoring", "Scheduled improvements", "Support hours each month"],
  },
];

const packages = [
  { name: "Discover", hours: "40–50 hours / month", fit: "Organizations at the beginning of their AI journey, ready to explore opportunities." },
  { name: "Accelerate", hours: "100–120 hours / month", fit: "Teams with a clear AI idea that need help with execution and integration." },
  { name: "Pioneer", hours: "220–260 hours / month", fit: "Businesses that want to be first to market with custom AI and stay ahead." },
];

export default function HowWeWorkPage() {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="From first conversation to an AI system your teams rely on."
        description="Every engagement follows the same five stages, so you always know what is being built, what it will cost, and how success is measured."
        primary={{ label: "Start with discovery", href: "/contact" }}
        secondary={{ label: "See case studies", href: "/case-studies" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-[#221c4a]">The delivery path</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <ol className="space-y-2">
            {phases.map((item, index) => (
              <li key={item.name}>
                <button
                  onClick={() => setActive(index)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition ${
                    active === index ? "bg-[#221c4a] text-white shadow-lg" : "bg-white text-[#221c4a] hover:bg-violet-50"
                  }`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${active === index ? "bg-teal-300 text-[#221c4a]" : "bg-violet-100 text-[#605BAD]"}`}>
                    {index + 1}
                  </span>
                  <span className="font-semibold">{item.name}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Stage {active + 1} of {phases.length}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#221c4a]">{phase.name}</h3>
            <p className="mt-3 leading-7 text-gray-600">{phase.summary}</p>
            <p className="mt-6 text-sm font-semibold text-[#221c4a]">What you receive</p>
            <ul className="mt-3 space-y-2">
              {phase.outputs.map((output) => (
                <li key={output} className="flex items-center gap-3 text-gray-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6fb] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#221c4a]">Engagement packages</h2>
          <p className="mt-2 text-gray-600">Each package includes a technical PM, a strategic value consultant, a PhD-level AI expert, and data or ML engineering.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {packages.map((item) => (
              <div key={item.name} className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-[#221c4a]">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-teal-700">{item.hours}</p>
                <p className="mt-4 text-sm leading-6 text-gray-600">{item.fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16">
        <CtaBand />
      </div>
    </>
  );
}
