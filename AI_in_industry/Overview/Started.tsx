"use client";

import { Users, Target, BarChart3, Handshake } from "lucide-react";

export default function GettingStartedAI() {
    const steps = [
        {
            icon: <Users size={38} />,
            title: "Identify Problems & Opportunities",
            text: "Identify areas of your business that can be improved such as insights, processes and products",
        },
        {
            icon: <Target size={38} />,
            title: "Define & Prioritise Objectives",
            text: "Well defined objectives are the foundation of successful innovation and business outcomes",
        },
        {
            icon: <BarChart3 size={38} />,
            title: "Understand Your Data",
            text: "Data is critical to achieving success with AI. Understand what data is and how data is stored",
        },
        {
            icon: <Handshake size={38} />,
            title: "Contact Byte Analytics",
            text: "This one’s a no-brainer. Contact us to discuss how Byte Analytics can help your business today",
        },
    ];

    return (
        <section className="py-20 bg-[#F6F6F6]">
            <div className="w-full lg:w-3/4 mx-auto px-6 text-center">
                <h2 className="text-3xl font-light text-gray-700 mb-4">
                    Getting started with AI
                </h2>

                <p className="text-gray-600 mb-16 max-w-3xl mx-auto">
                    Artificial Intelligence is complex. That’s why we recommend starting your AI journey
                    where you’re the expert – your business.
                </p>

                <div className="flex flex-col md:flex-row justify-between">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`
                                flex flex-col items-center px-6 py-6
                                ${idx !== steps.length - 1 ? "md:border-r border-gray-300" : ""}
                            `}
                        >
                            <div className="text-[#605BAD] mb-4">{step.icon}</div>

                            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                                {step.title}
                            </h3>

                            <p className="text-gray-600 text-sm max-w-[220px] text-center">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
