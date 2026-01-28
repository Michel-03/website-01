"use client";

import { Check } from "lucide-react";

const items = [
  "Integrate LLMs (such as ChatGPT) with your internal software or system",
  "Safely upload proprietary data (PDFs, Word, Excel, Emails and other) into a document store",
  "Fine-tune the model with your data",
  "Search and retrieve relevant information",
  "Summarise findings about a topic you’re interested in",
  "Write articles about a selected topic based on your input data",
  "Produce custom branded reports",
  "Engineered prompts to make your interactions more accurate and cost effective",
  "Save money by using the retrieval plugin to look at content relevant to your search",
];

export default function LLMInfoSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="lg:max-w-[75%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT COLUMN */}
        <div>
          <h2 className="text-[20px] md:text-[24px] text-gray-800 leading-snug mb-3">
            Are you wondering how to leverage ChatGPT for your 
            <br />
            company’s benefit? You’re in the right place.
          </h2>

          <p className="text-gray-600 text-sm md:text-base mb-4">
            Byte Analytics provides ChatGPT alternatives allowing you to safely leverage the 
            benefit of these new AI technologies in your business environment.
          </p>

          <p className="text-gray-600 text-sm md:text-base mb-4">
            Our Custom GPT solutions allow you to:
          </p>

          <ul className="space-y-3">
            {items.map((text, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={18} className="text-green-500 mt-1" />
                <span className="text-gray-700 text-sm md:text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <h2 className="text-[22px] md:text-[26px] text-gray-800 leading-snug mb-2">
            Get in touch with <span className="text-[#28C2A0] font-semibold">Byte Analytics</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Learn how Large Language Models can help your 
            business.
          </p>
        </div>
      </div>
    </section>
  );
}
