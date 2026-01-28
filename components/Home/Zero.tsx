"use client";
import Image from "next/image";

export default function ProcessSection() {
    const steps = [
        {
            number: 1,
            title: "AI discovery session",
            description:
                "Identify opportunities to transform your business with AI, calculate ROI, and prioritise use cases.",
        },
        {
            number: 2,
            title: "AI scoping programme",
            description:
                "Build a robust AI strategy, predict and mitigate risk factors, and develop a detailed roadmap.",
        },
        {
            number: 3,
            title: "Proof of concept (PoC)",
            description:
                "Validate that a solution will work by building the simplest possible version of your product.",
        },
        {
            number: 4,
            title: "Minimum viable product (MVP)",
            description:
                "Turn the PoC into the simplest usable version that can be beta-tested by real users.",
        },
        {
            number: 5,
            title: "Ongoing maintenance",
            description:
                "Maintain and enhance your product with continuous updates and the latest AI technology trends.",
        },
    ];

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-[75%] mx-auto px-6 flex flex-col items-center gap-8">
                <div className="w-full text-left lg:ml-40">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-thin text-gray-900">
                        From <span className="text-teal-600 font-bold">Start to Scale</span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto ml-0 mt-2 text-sm sm:text-base md:text-lg">
                        A step-by-step approach to bring AI into your business.
                    </p>
                </div>

                {/* side-by-side on md+, stacked on small screens */}
                <div className="w-full flex flex-row md:flex-row items-center md:items-start justify-center gap-8">
                    {/* IMAGE (left on md+) */}
                    <div className="w-full md:w-1/2 flex justify-end md:justify-end">
                        <Image
                            src="/VERTI.png"
                            alt="AI Implementation Process"
                            width={320}
                            height={160}
                            className="rounded-lg object-contain w-40 md:w-72 h-120"
                        />
                    </div>

                    {/* CONTENT (right on md+) */}
                    <div className="w-full md:w-1/2 max-w-3xl">
                        <div className="space-y-6">
                            {steps.map((step) => (
                                <div key={step.number} className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 bg-teal-600 text-white rounded-full font-bold flex-shrink-0">
                                        {step.number}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm md:text-sm leading-relaxed">
                                            {step.description}
                                        </p>

                                        {step.number !== steps.length && (
                                            <div className="mt-4 h-px bg-gray-100" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
