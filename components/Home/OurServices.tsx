"use client";

import Image from "next/image";
import { Star, MessageCircle, Search, BarChart2, Bot } from "lucide-react";

export default function ServicesSection() {
    const services = [
        {
            icon: <Star className="text-purple-500" size={22} />,
            title: "Customer Analytics",
            desc: "Bring your customer experience to the next level.",
        },
        {
            icon: <MessageCircle className="text-purple-500" size={22} />,
            title: "Answer Generator",
            desc: "Talk to your manuals, guidelines and regulatory books.",
        },
        {
            icon: <Search className="text-purple-500" size={22} />,
            title: "Information Finder",
            desc: "Have all your business information at your fingertips.",
        },
        {
            icon: <BarChart2 className="text-purple-500" size={22} />,
            title: "Report Generator",
            desc: "Quality, domain-specific content generation based on your business data.",
        },
        {
            icon: <Bot className="text-purple-500" size={22} />,
            title: "AI Agents",
            desc: "Outsource manual tasks to agents.",
        }
    ];

    return (
        <section className="w-full flex justify-center bg-gray-50 py-20 px-6">
            <div className="max-w-[75%] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-2xl md:text-4xl font-thin text-gray-800">
                        Our <span className="text-teal-600 font-bold">Services</span>
                    </h2>
                    <p className="text-gray-400 mt-2 mb-6 text-base md:text-sm">
                        Increase your operational efficiency with an AI-powered toolkit.
                    </p>

                    {/* SERVICE CARDS */}
                    <div className="space-y-3">
                        {services.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 border border-gray-400 rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="text-purple-500">{s.icon}</div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">{s.title}</h3>
                                    <p className="text-gray-500 text-xs">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <button className="mt-6 bg-[#605BAD] text-white px-6 py-2 rounded-md text-sm hover:bg-violet-900 transition">
                        CONTACT US
                    </button> */}
                    <a
                        href="#contact"
                        className="inline-flex items-center px-5 py-2 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow transition mt-6"
                    >
                        CONTACT US
                    </a>
                </div>

                {/* RIGHT SIDE IMAGE */}
                {/* <div className="flex items-center justify-center w-full h-full">
                    <div className="hidden md:block rounded-lg overflow-hidden border-r-8 border-teal-400 w-full max-w-md h-100">
                        <Image
                            src="/images/gen.jpg"
                            alt="Inhouse AI Platform Illustration"
                            width={640}
                            height={480}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div> */}
                <div className="flex items-center justify-center w-full h-full">
                    <div className="hidden md:block rounded-lg overflow-hidden border-r-8 border-teal-400 w-full mx-automd:w-100 h-60 lg:h-80"
                    >
                        <Image
                            src="/images/gen.jpg"
                            alt="Inhouse AI Platform Illustration"
                            width={640}
                            height={480}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>


            </div>
        </section>
    );
}
