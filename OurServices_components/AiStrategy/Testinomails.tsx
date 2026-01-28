"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
    const testimonials = [
        {
            text: "Their rigour and determination to use AI and ML to solve problems was second to none.",
            author: "Ameet Benegal",
            role: "Director, HSBC Global Commercial Banking",
            logo: "/images/gen.jpg",
        },
        {
            text: "Byte Analytics’s support was invaluable in helping us develop AI-driven models that transformed our processes.",
            author: "Sarah Thompson",
            role: "CTO, FinEdge Innovations",
            logo: "/images/genai.jpg",
        },
        {
            text: "A brilliant team of AI experts delivering results with professionalism and insight.",
            author: "David Miller",
            role: "Head of Analytics, TechCore Labs",
            logo: "/images/genai1.jpg",
        },
        {
            text: "We deployed AI solutions 10x faster with Byte Analytics’s expert support.",
            author: "Emily Carter",
            role: "AI Lead, Nova Retail Group",
            logo: "/images/gen.jpg",
        },
        {
            text: "Byte Analytics accelerated our AI roadmap with excellent consultants.",
            author: "John Williams",
            role: "Innovation Manager, Alpha Systems",
            logo: "/images/genai.jpg",
        },
    ];

    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const timeoutRef = useRef<any>(null);

    // Auto play every 6 seconds
    useEffect(() => {
        timeoutRef.current = setTimeout(() => handleNext(), 6000);
        return () => clearTimeout(timeoutRef.current);
    }, [current]);

    const handleNext = () => {
        setDirection("next");
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection("prev");
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-white flex flex-col items-center px-4">
            <h2 className="text-3xl font-thin text-gray-600 mb-10">Testimonials</h2>

            {/* CARD + DESKTOP ARROWS */}
            <div className="relative w-800 max-w-[80%] max-h-[200px]">

                {/* LEFT ARROW (desktop only) */}
                <button
                    onClick={handlePrev}
                    className="
                        hidden md:flex
                        absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12
                        bg-purple-500 text-white w-10 h-10 rounded-full 
                        items-center justify-center hover:bg-purple-600 
                        transition z-20
                    "
                >
                    <ChevronLeft size={22} />
                </button>

                {/* SLIDER */}
                <div className="relative w-full overflow-hidden min-h-[400px]">

                    <div
                        key={`slide-${current}`}
                        className={`
                            absolute top-0 left-0 w-full
                            ${direction === "next" ? "animate-slide-left-in" : ""}
                            ${direction === "prev" ? "animate-slide-right-in" : ""}
                        `}
                    >
                        <div className="
                            bg-gray-100 rounded-2xl shadow 
                            p-6 sm:p-8 md:p-10 
                            flex flex-col md:flex-row 
                            gap-8 md:gap-10
                            border-t-8 border-purple-500 lg:w-250 mx-auto
                        ">

                            {/* MOBILE IMAGE ON TOP */}
                            <div className="flex md:hidden justify-center">
                                <Image
                                    src={testimonials[current].logo}
                                    alt="Logo"
                                    width={150}
                                    height={150}
                                    className="rounded-full border-4 border-teal-400 shadow-md w-35 h-35"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="flex-1">
                                <p className="text-gray-600 text-base leading-relaxed italic">
                                    "{testimonials[current].text}"
                                </p>

                                <p className="mt-6 font-semibold text-gray-800">
                                    {testimonials[current].author}
                                    <span className="font-normal text-gray-500">
                                        {" "}– {testimonials[current].role}
                                    </span>
                                </p>
                            </div>

                            {/* DESKTOP LOGO ON RIGHT */}
                            <div className="hidden md:flex items-center justify-center">
                                <Image
                                    src={testimonials[current].logo}
                                    alt="Company Logo"
                                    width={150}
                                    height={150}
                                    className="rounded-full border-4 border-teal-400 shadow-lg w-35 h-35"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT ARROW (desktop only) */}
                <button
                    onClick={handleNext}
                    className="
                        hidden md:flex
                        absolute right-0 top-1/2 -translate-y-1/2 translate-x-12
                        bg-purple-500 text-white w-10 h-10 rounded-full 
                        items-center justify-center hover:bg-purple-600 
                        transition z-20
                    "
                >
                    <ChevronRight size={22} />
                </button>
            </div>

            {/* MOBILE ARROWS UNDER CARD */}
            <div className="flex justify-center gap-6 mt-60 md:mt-20 md:hidden">
                <button
                    onClick={handlePrev}
                    className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition"
                >
                    <ChevronLeft size={22} />
                </button>

                <button
                    onClick={handleNext}
                    className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition"
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </section>
    );
}
