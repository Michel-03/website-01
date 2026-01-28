"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

/**
 * ServiceDetails (Agnostic AI) component
 *
 * Behavior:
 * - Reads ?content= from URL and opens the corresponding tab
 * - Listens to `nav-scroll` events (dispatched by Navbar) and:
 *     - reads current URL ?content= and sets tab accordingly
 *     - scrolls the page to the service section (smooth)
 * - Clicking internal tabs only updates the active tab (no URL change, no scroll)
 */

const serviceData = [
  {
    name: "Customer Analytics",
    key: "customer-analytics",
    image: "/images/genone.jpg",
    subtitle: "Bring your customer experience to the next level",
    description: [
      "By leveraging LLMs businesses gain deeper insights into customer needs...",
      "Throughout the project we combine data from multiple sources..."
    ],
    benefits: [
      { title: "Intelligent Product Management", text: "Adapt your product..." },
      { title: "Deep Understanding of Behaviour", text: "Discover new patterns..." },
      { title: "Enhanced Segmentation", text: "Enable highly targeted..." },
      { title: "Predictive Analysis", text: "Predict customer needs..." },
      { title: "Competitive Analysis", text: "Understand competitors..." },
    ]
  },
  {
    name: "Answer Generator",
    key: "answer-generator",
    image: "/images/gen.jpg",
    subtitle: "Talk to your manuals, guidelines and regulatory books",
    description: [
      "AI-powered answer generation transforms static documents...",
      "Rather than searching through long documents..."
    ],
    benefits: [
      { title: "Increased Conversion Rate", text: "Help customers find..." },
      { title: "Improved Productivity", text: "Employees focus on high-value tasks..." },
      { title: "Improved Customer Service", text: "Reduce response times..." },
      { title: "Data-Driven Decisions", text: "Identify patterns..." },
      { title: "Better Knowledge Management", text: "Centralized knowledge..." },
    ]
  },
  {
    name: "Information Finder",
    key: "information-finder",
    image: "/images/gentwo.jpg",
    subtitle: "Have all your business information at your fingertips",
    description: [
      "Retrieve relevant insights instantly...",
      "Index your entire business knowledge..."
    ],
    benefits: [
      { title: "Faster Information Access", text: "Reduce searching time..." },
      { title: "Better Team Efficiency", text: "Empower teams..." },
      { title: "Improved Accuracy", text: "Surface the most relevant..." },
    ]
  },
  {
    name: "Report Generator",
    key: "report-generator",
    image: "/images/gen.jpg",
    subtitle: "Automate creation of business reports",
    description: [
      "Generate tailored reports...",
      "Increase quality and reduce manual workload..."
    ],
    benefits: [
      { title: "High-Quality Content", text: "Generate structured reports..." },
      { title: "Save Time", text: "Eliminate manual work..." },
      { title: "Consistency", text: "Ensure standardized reporting..." },
    ]
  },
  {
    name: "AI Agents",
    key: "ai-agents",
    image: "/images/genthree.jpg",
    subtitle: "Outsource manual tasks to AI agents",
    description: [
      "Automate repetitive work using LLM agents...",
      "Let AI perform workflows end-to-end..."
    ],
    benefits: [
      { title: "Operational Efficiency", text: "Automate tasks..." },
      { title: "Cost Savings", text: "Reduce manpower..." },
      { title: "Always Available", text: "Agents work 24/7..." },
    ]
  }
];

export default function ServiceDetails() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = searchParams.get("content");
  const indexFromUrl = serviceData.findIndex((x) => x.key === content);
  const initialTab = indexFromUrl !== -1 ? indexFromUrl : 0;

  // activeTab is local only. Tabs DO NOT change URL.
  const [activeTab, setActiveTab] = useState<number>(initialTab);

  // helper scroll function
  const scrollToSection = () => {
    // small timeout so the DOM can settle after navigation
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  // When URL ?content= changes, update activeTab and scroll
  useEffect(() => {
    const idx = serviceData.findIndex((x) => x.key === content);
    const tabIndex = idx !== -1 ? idx : 0;
    setActiveTab(tabIndex);
    // scroll only when content param exists (i.e., nav clicked)
    if (content) scrollToSection();
  }, [content]);

  // When nav dispatches event (clicking navbar), read URL again and scroll + set tab
  useEffect(() => {
    const handler = () => {
      // read current url content query directly (in case useSearchParams isn't updated instantly)
      try {
        const url = new URL(window.location.href);
        const q = url.searchParams.get("content");
        const idx = serviceData.findIndex((x) => x.key === q);
        const tabIndex = idx !== -1 ? idx : 0;
        setActiveTab(tabIndex);
        scrollToSection();
      } catch (err) {
        // fallback: just scroll
        scrollToSection();
      }
    };

    window.addEventListener("nav-scroll", handler);
    return () => window.removeEventListener("nav-scroll", handler);
  }, []);

  // Expose the currently selected service
  const service = serviceData[activeTab];

  return (
    <section id="service-section" ref={sectionRef} className="w-full flex justify-center py-20 px-6">
      <div className="lg:max-w-[75%] w-full">
        {/* TABS — internal only */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          {serviceData.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActiveTab(i)} // internal only: NO URL change, NO scroll
              className={`px-5 py-2 text-xs rounded-md border transition-all ${
                activeTab === i ? "bg-[#605BAD] text-white border-[#605BAD]" : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {s.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div>
            <h2 className="text-2xl font-light text-gray-800 mb-4">{service.name}</h2>

            <div className="rounded-xl overflow-hidden border-l-8 border-teal-400 w-full">
              <div className="relative w-full h-60 lg:h-80">
                <Image src={service.image} alt={service.name} fill className="object-cover" />
              </div>
            </div>

            <h3 className="mt-6 text-gray-800 font-semibold text-sm uppercase">{service.subtitle}</h3>

            {service.description.map((d, i) => (
              <p key={i} className="text-gray-600 text-sm leading-relaxed mt-4">{d}</p>
            ))}

            <button className="mt-6 bg-[#605BAD] text-white px-6 py-2 rounded-md text-sm hover:bg-violet-900 transition">
              CONTACT US
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h3 className="text-teal-600 text-sm font-bold mb-4">KEY BENEFITS</h3>

            {service.benefits.map((b, i) => (
              <div key={i} className="py-4 border-b border-gray-200">
                <h4 className="text-gray-800 text-sm font-semibold">{b.title}</h4>
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

