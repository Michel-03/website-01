"use client";
import Image from "next/image";


import { Lightbulb, ShieldCheck, DollarSign, Microscope, Lock, BadgeCheck } from "lucide-react";

const advantages = [
  {
    icon: <Lightbulb size={36} className="text-brand-accent" />,
    title: "Retain IP Ownership",
    description: "Own the IP to the AI tools that you invest in.",
  },
  {
    icon: <ShieldCheck size={36} className="text-brand-accent" />,
    title: "Avoid Vendor Lock",
    description: "Have the freedom and flexibility to customize your agnostic AI Engine.",
  },
  {
    icon: <DollarSign size={36} className="text-brand-accent" />,
    title: "Pay Less",
    description: "Efficient use of tokens through hyper personalized requests.",
  },
  {
    icon: <Microscope size={36} className="text-brand-accent" />,
    title: "Model Agnostic",
    description: "SLM, LLM, OOB or Open Source. We constantly evaluate the best approach.",
  },
  {
    icon: <BadgeCheck size={36} className="text-brand-accent" />,
    title: "Ensure Output Quality",
    description: "Your custom solution is fine-tuned with your data and context ensuring high quality.",
  },
  {
    icon: <Lock size={36} className="text-brand-accent" />,
    title: "Secure and Safe",
    description: "Your data in your environment is always kept safe.",
  },
];


export default function Benifits() {
    return (
        <section className="py-10 bg-white">
            <div className="lg:max-w-[75%] mx-auto px-2 text-left flex flex-row gap-6">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="flex-1 p-6 rounded-lg">
                            <h2 className="text-2xl font-thin mb-2">
                            <span className="text-teal-500 font-bold text-2xl">Benifits</span> of Agnostic AI Infrastructure
                            </h2>
                            {/* <p className="text-sm mb-4 text-gray-400">
                                Safely deployed, domain-specific, fine-tuned AI for business.
                            </p> */}
                        </div>

                        {/* <div className="flex-shrink-0 mt-4">
                            <button className="px-5 py-2 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow hidden sm:block">
                                CONTACT US
                            </button>
                        </div> */}
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