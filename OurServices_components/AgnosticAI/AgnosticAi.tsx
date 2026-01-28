"use client";

import Image from "next/image";

export default function AgnosticAICom() {
    return (
        <section className="w-full flex justify-center bg-gray-100 py-15">
            <div className="w-full lg:max-w-[75%] px-6">

                {/* HEADING */}
                <div className="w-full text-left">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-thin text-gray-900">
                        What is
                        <span className="text-teal-600 font-bold"> Agnostic AI</span>
                    </h2>

                    <p className="text-gray-400 max-w-3xl mt-2 text-sm sm:text-base md:text-lg">
                        Make AI development fast and efficient by leveraging our AI toolbox.
                    </p>
                </div>

                {/* IMAGE */}
                <div className="mt-10 flex justify-center w-full bg-gray-100">
                    <Image
                        src="/Agnostic.png"
                        alt="AI Components Illustration"
                        width={1600}
                        height={1200}
                        className="rounded-lg object-cover"
                    />
                </div>

            </div>
        </section>
    );
}
