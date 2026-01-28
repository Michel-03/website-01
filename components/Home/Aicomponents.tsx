"use client";

import Image from "next/image";

export default function Aicomponent() {
    return (
        <section className="w-full flex justify-center bg-gray-10 py-15">
            <div className="w-full lg:max-w-[75%] px-6">

                {/* HEADING */}
                <div className="w-full text-left">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-thin text-gray-900">
                        Byte Analytics Cortex - Ready-made AI
                        <span className="text-teal-600 font-bold"> Components</span>
                    </h2>

                    <p className="text-gray-400 max-w-3xl mt-2 text-sm sm:text-base md:text-lg">
                        Make AI development fast and efficient by leveraging our AI toolbox.
                    </p>
                </div>

                {/* IMAGE */}
                <div className="mt-10 flex justify-center">
                    <Image
                        src="/Ai.png"
                        alt="AI Components Illustration"
                        width={600}
                        height={500}
                        className="rounded-lg"
                    />
                </div>

            </div>
        </section>
    );
}
