import Link from "next/link";
import Scene3D from "../visual/Scene3D";

export default function HeroSection() {
    return (
        <section className="lg:max-w-[75%] mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
                <h1 className="font-[100] text-2xl text-gray-800">
                    Empowering Businesses with <span className="font-bold text-teal-400 ">Trusted AI </span>
                </h1>

                <p className="mt-4 text-xl font-semibold text-gray-400">
                    Expert AI Consultancy Since 2019.
                </p>

                <p className="mt-3 text-gray-500 text-sm">
                    Founded in 2019, Byte Analytics specializes in delivering cutting-edge Artificial Intelligence and data-driven solutions that empower businesses across diverse industries. Our goal is to enable organizations to harness the full potential of AI, automation, and modern data platforms to achieve sustainable growth and transformation.
                </p>

                <p className="mt-1 text-gray-500 text-sm">
                    We offer deep expertise across the Domains like 
                    <span className="font-bold"> Artificial Intelligence,</span>
                    <span className="font-bold">Data Science,</span>
                    <span className="font-bold">Data Engineering,</span>
                    <span className="font-bold">Lakeflow & Data Warehousing,</span>
                    <span className="font-bold">Automation & Integration,</span>
                    
                    Our team leverages leading technologies and platforms including Databricks, AWS, Snowflake, Azure, UiPath, and MuleSoft to deliver secure, scalable, and intelligent solutions.
                </p>

                <div className="mt-8 flex gap-4">
                    {/* <button className="px-5 py-2 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow transition cursor-pointer">
                        CONTACT US
                    </button>
                     */}
                    <a
                        href="#contact"
                        className="inline-flex items-center px-5 py-2 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow transition"
                    >
                        CONTACT US
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-5 py-2 text-xs border border-[#605BAD] text-[#605BAD] hover:bg-[#605BAD] hover:text-white rounded-md"
                    >
                        BOOK AI CONSULTATION
                    </Link>
                </div>
            </div>
            {/* Right Image */}
            <div className="relative hidden h-[420px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-2xl md:block">
                <Scene3D />
            </div>
        </section>
    )
}



