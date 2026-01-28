"use client";

import Image from "next/image";

export default function CaseStudiesSection() {
    const studies = [
        {
            title:
                "Green FinTech Disruptor Partners with Byte Analytics to track transaction-level Carbon Footprint.",
            tag: "Finance",
            label: "Case Study",
            image: "/images/gen.jpg",
        },
        {
            title:
                "AI-Driven Design Pipeline in E-Commerce",
            tag: "E-Commerce & Design",
            label: "Case Study",
            image: "/images/genone.jpg",
        },
    ];

    return (
        <section className="w-full flex justify-center bg-gray-50 py-20 px-6">
            <div className="max-w-[75%] w-full">

                {/* Section Title */}
                <h2 className="text-2xl md:text-3xl font-light text-gray-700 mb-10">
                    Case Studies
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {studies.map((caseItem, idx) => (
                        <div
                            key={idx}
                            className="
                                relative rounded-xl overflow-hidden 
                                w-full h-100 cursor-pointer group
                                shadow-md hover:shadow-xl transition-all
                            "
                        >
                            {/* Background Image */}
                            <Image
                                src={caseItem.image}
                                alt={caseItem.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-all duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gray-500/40 group-hover:bg-opacity-50 transition-all"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                <p className="text-xs opacity-90">{caseItem.label}</p>
                                <p className="text-xs mt-1 opacity-90">{caseItem.tag}</p>

                                <h3 className="text-lg md:text-xl mt-3 font-semibold leading-snug">
                                    {caseItem.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
