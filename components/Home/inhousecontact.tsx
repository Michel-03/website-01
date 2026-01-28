"use client";
import Image from "next/image";


import { Lightbulb, ShieldCheck, DollarSign, Microscope, Lock, BadgeCheck } from "lucide-react";

const advantages = [
  {
    icon: <Lightbulb size={36} className="text-brand-accent" />,
    title: "Own Your IP",
    description: "Maintain control over the AI assets you invest in.",
  },
  {
    icon: <ShieldCheck size={36} className="text-brand-accent" />,
    title: "Avoid Vendor Lock",
    description: "Maintain control with a fully adaptable AI architecture.",
  },
  {
    icon: <DollarSign size={36} className="text-brand-accent" />,
    title: "Save More",
    description: "Minimized token usage through precise, customized requests.",
  },
  {
    icon: <Microscope size={36} className="text-brand-accent" />,
    title: "Model Independent",
    description: "From SLMs to LLMs, open or proprietary—we choose what works best.",
  },
  {
    icon: <BadgeCheck size={36} className="text-brand-accent" />,
    title: "Assure High-Quality Output",
    description: "Customized with your data and context to ensure reliable, high-quality responses.",
  },
  {
    icon: <Lock size={36} className="text-brand-accent" />,
    title: "Enterprise Secure",
    description: "Data is always safeguarded within your environment.",
  },
];


export default function Inhousecontact() {
    return (
        <section className="py-10 bg-white">
            <div className="lg:max-w-[75%] mx-auto px-2 text-left flex flex-row gap-6">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="flex-1 p-6 rounded-lg">
                            <h2 className="text-xl font-thin mb-2">
                                Your <span className="text-teal-500 font-bold text-xl">Your AI Platform </span> Vs. Off-the-Shelf AI SaaS
                            </h2>
                            <p className="text-sm mb-4 text-gray-400">
                                Reliably deployed, industry-specific, optimized AI solutions.
                            </p>
                        </div>

                        <div className="flex-shrink-0 mt-4">
                            {/* <button className="px-5 py-2 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow hidden sm:block">
                                CONTACT US
                            </button> */}
                            <a
                                href="#contact"
                                className="inline-flex items-center px-5 py-2 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow transition"
                            >
                                CONTACT US
                            </a>
                        </div>
                    </div>

                    <div className="w-full mt-6 bg-white p-4 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {advantages.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-start justify-start gap-4 border-l border-gray-400 pl-6 hover:translate-y-[-4px] transition-transform duration-300"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div>
        </section>
    )
}