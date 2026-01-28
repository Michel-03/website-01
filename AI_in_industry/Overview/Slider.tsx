"use client";

import { useState, useEffect, useRef } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Gauge,
    Hand,
    Wallet,
    Layers,
    Users,
    Sparkles,
    Lightbulb,
    Scan,
} from "lucide-react";
import Image from "next/image";

export default function ThemesSlider() {
    const themes = [
        {
            title: "Automation",
            img: "/images/gen.jpg",
            content: [
                "Automated systems act autonomously and perform tasks with little to no human involvement.",
                "Automation boosts efficiency and productivity by reducing repetitive tasks and operational errors.",
                "It enhances human capability in roles requiring creativity, leadership, and problem-solving.",
                "True value comes from combining human strengths with automation — not replacing them.",
            ],
            benefits: [
                { icon: <Gauge size={26} />, label: "Speed & Efficiency" },
                { icon: <Hand size={26} />, label: "Reduce Manual Work" },
                { icon: <Wallet size={26} />, label: "Lower Costs" },
                { icon: <Layers size={26} />, label: "Scale Delivery" },
                { icon: <Users size={26} />, label: "Employee Satisfaction" },
            ],
        },
        {
            title: "Prediction",
            img: "/images/gen.jpg",
            content: [
                "AI systems can forecast demand, risks, behaviour and trends with high accuracy.",
                "Predictive models help optimise inventory, reduce losses and improve planning.",
                "Businesses gain foresight that supports faster and more confident decisions.",
                "Prediction reduces uncertainty and drives proactive strategy, not reactive response.",
            ],
            benefits: [
                { icon: <Lightbulb size={26} />, label: "Smarter Decisions" },
                { icon: <Gauge size={26} />, label: "Reduced Risk" },
                { icon: <Wallet size={26} />, label: "Cost Savings" },
                { icon: <Layers size={26} />, label: "Operational Accuracy" },
                { icon: <Users size={26} />, label: "Customer Confidence" },
            ],
        },
        {
            title: "Personalisation",
            img: "/images/gen.jpg",
            content: [
                "AI tailors experiences to individual preferences and behaviour patterns.",
                "It powers customised recommendations, messaging and product experiences.",
                "Personalisation increases engagement, loyalty and conversion.",
                "Customers expect relevant experiences — AI makes this possible at scale.",
            ],
            benefits: [
                { icon: <Sparkles size={26} />, label: "Better Experience" },
                { icon: <Users size={26} />, label: "Higher Engagement" },
                { icon: <Wallet size={26} />, label: "Increased Revenue" },
                { icon: <Layers size={26} />, label: "Scalable Customisation" },
                { icon: <Gauge size={26} />, label: "Improved Retention" },
            ],
        },
        {
            title: "Recognition",
            img: "/images/gen.jpg",
            content: [
                "AI recognises patterns in text, voice, images and video with high precision.",
                "It powers fraud detection, medical imaging, biometric security and more.",
                "Recognition improves safety, reduces errors and enhances automation.",
                "It unlocks new forms of interaction between humans and technology.",
            ],
            benefits: [
                { icon: <Scan size={26} />, label: "Smart Detection" },
                { icon: <Users size={26} />, label: "Safety & Security" },
                { icon: <Wallet size={26} />, label: "Cost Avoidance" },
                { icon: <Layers size={26} />, label: "High Accuracy" },
                { icon: <Gauge size={26} />, label: "Faster Processing" },
            ],
        },
    ];

    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % themes.length);
        }, 6000);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [current, themes.length]);

    const clearExistingTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleNext = () => {
        clearExistingTimeout();
        setCurrent((prev) => (prev + 1) % themes.length);
    };

    const handlePrev = () => {
        clearExistingTimeout();
        setCurrent((prev) => (prev - 1 + themes.length) % themes.length);
    };

    const jumpTo = (index: number) => {
        clearExistingTimeout();
        setCurrent(index);
    };

    return (
        <section className="py-20 bg-white flex flex-col items-center">
            <h2 className="text-3xl font-light text-gray-700 mb-10">
                Themes of AI
            </h2>

            <div
                className="
                    relative
                    w-full
                    max-w-full
                    lg:w-3/4
                    mx-auto
                    px-4
                    overflow-visible
                "
            >
                {/* DESKTOP ARROWS */}
                <button
                    type="button"
                    onClick={handlePrev}
                    className="
                        hidden md:flex
                        absolute
                        left-[-60px]
                        top-1/2
                        -translate-y-1/2
                        bg-[#605BAD] text-white
                        w-12 h-12 rounded-full
                        items-center justify-center
                        hover:bg-violet-700
                        transition
                        z-40
                    "
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    className="
                        hidden md:flex
                        absolute
                        right-[-60px]
                        top-1/2
                        -translate-y-1/2
                        bg-[#605BAD] text-white
                        w-12 h-12 rounded-full
                        items-center justify-center
                        hover:bg-violet-700
                        transition
                        z-40
                    "
                >
                    <ChevronRight size={24} />
                </button>

                {/* CARD */}
                <div className="relative bg-white w-full rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="h-6 bg-[#605BAD] rounded-t-2xl" />

                    <div className="p-8 flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col items-center md:w-[35%]">
                            <div className="w-44 h-44 rounded-full border-[3px] border-[#31C3A6] overflow-hidden relative mb-4">
                                <Image
                                    src={themes[current].img}
                                    alt={themes[current].title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">
                                {themes[current].title}
                            </h3>
                        </div>

                        <div className="md:w-[60%] space-y-4">
                            {themes[current].content.map((p, idx) => (
                                <p key={idx} className="text-gray-600 leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 pb-10 px-8 text-center">
                        <h4 className="text-lg font-semibold text-gray-700 mb-6">
                            Business Benefits
                        </h4>

                        <div className="flex flex-wrap justify-center gap-8">
                            {themes[current].benefits.map((b, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center px-4 border-l last:border-r
                                    first:border-l-0 border-gray-300"
                                >
                                    <div className="text-[#605BAD] mb-2">{b.icon}</div>
                                    <p className="text-sm text-gray-700 font-medium text-center w-28">
                                        {b.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MOBILE ARROWS BELOW CARD */}
                <div className="flex md:hidden justify-center gap-8 mt-8">
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="bg-[#605BAD] text-white w-12 h-12 rounded-full flex items-center justify-center"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#605BAD] text-white w-12 h-12 rounded-full flex items-center justify-center"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>
            </div>

            {/* DOTS */}
            <div className="flex gap-3 mt-10">
                {themes.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => jumpTo(index)}
                        className={`w-3 h-3 rounded-full transition ${
                            current === index ? "bg-[#605BAD]" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
