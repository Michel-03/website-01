"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How many experts are in the Byte Analytics network?",
    answer:
      "Byte Analytics has a network of 500 artificial intelligence and machine learning experts. We are attracting new “Byte Analytics” every day and this number is constantly growing.",
  },
  {
    question:
      "In which countries does Byte Analytics have their network of AI and machine learning experts?",
    answer: "Our network spans multiple countries across Europe, Asia, and America.",
  },
  {
    question: "What if Byte Analytics doesn’t have experts in my country?",
    answer: "We work remotely as well, connecting global experts to your project.",
  },
  {
    question:
      "In which areas of data science, AI and machine learning do Byte Analytics have experts?",
    answer:
      "We cover NLP, computer vision, deep learning, forecasting, analytics, data engineering and more.",
  },
  {
    question:
      "How does Byte Analytics assess data scientists to ensure they only have the best people in their network?",
    answer:
      "We follow a rigorous multi-stage screening process including technical tests and interviews.",
  },
  {
    question:
      "How does Byte Analytics select the best candidates (“Byte Analytics”) to work on a project?",
    answer:
      "We match skills, domain knowledge, availability and project needs using our matching engine.",
  },
];

export default function FaqAbout() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (i: number) => {
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div className="lg:max-w-[75%] mx-auto px-4 py-12">
      <h2 className="text-3xl mb-8 text-gray-400">About Byte Analytics</h2>

      <div className="space-y-2">
        {faqData.map((item, index) => {
          const isOpen = openItems.includes(index);

          return (
            <div key={index} className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-3 text-left text-xs text-gray-800 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-xs md:text-xs">{item.question}</span>

                <ChevronDown
                  size={20}
                  className={`transition-transform duration-100 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated dropdown */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-40 opacity-100 mt-2 pb-3"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-xs px-3">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
