"use client";

import { useState } from "react";
import Scene3D from "@/components/visual/Scene3D";

const episodes = [
  {
    title: "What leadership should ask before an AI pilot",
    summary: "A practical briefing on ownership, data readiness, and the decision an executive team needs before funding a proof of concept.",
  },
  {
    title: "From model demo to operated system",
    summary: "How Byte Analytics moves a promising model into monitoring, access control, and a workflow people actually use.",
  },
  {
    title: "Data governance is the product",
    summary: "Why high-profile organizations treat lineage, quality, and access as part of the customer experience.",
  },
];

export default function PodcastPage() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#605BAD]">Briefings</p>
          <h1 className="mt-3 text-5xl font-semibold text-[#221c4a]">Podcast</h1>
          <p className="mt-4 text-gray-600">
            Short executive briefings from the Byte Analytics team. Select an episode to read the discussion outline.
          </p>
        </div>
        <div className="h-80 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0f0c29] via-[#1e1b4b] to-[#134e4a] shadow-xl shadow-[#605BAD]/30">
          <Scene3D />
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-3 px-6 pb-16">
        {episodes.map((episode, index) => (
          <button
            key={episode.title}
            onClick={() => setOpen(index)}
            className="block w-full rounded-3xl bg-white p-6 text-left shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-teal-700">Episode {index + 1}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#221c4a]">{episode.title}</h2>
            {open === index && <p className="mt-3 text-gray-600">{episode.summary}</p>}
          </button>
        ))}
      </section>
    </>
  );
}
