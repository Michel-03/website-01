"use client";

import Image from "next/image";
export default function Flow() {
    return (
        <section className="w-full flex justify-center bg-gray-10 py-15">
            <div className="w-full lg:max-w-[75%] px-6">
                {/* HEADING */}
                <div className="w-full text-left">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-thin text-gray-900">
                        Visualize Your AI Workflow with
                        <span className="text-teal-600 font-bold"> Flowcharts</span>
                    </h2>
                </div>

                {/* IMAGE */}
                <div className="mt-10 flex justify-center">
                    <Image
                        src="/flowchart.png"
                        alt="Flowchart Illustration"
                        width={800}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}