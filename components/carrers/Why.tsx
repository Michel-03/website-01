"use client";

import Image from "next/image";
export default function Why() {
    return (
        <section className="py-15 bg-gray-100 w-full">
            <div className="lg:max-w-[75%] mx-auto flex flex-col md:flex-row items-start gap-6 p-6">
                <div className="flex-shrink-0 rounded-lg overflow-hidden border-r-8 border-teal-400 w-full h-70 mx-auto sm:w-full md:w-120 md:mt-10 lg:mt-0 order-1 md:order-2">
                    <Image
                        src="/images/gen.jpg"
                        alt="Inhouse AI Platform Illustration"
                        width={320}
                        height={200}
                        className="w-full h-80 object-cover"
                    />
                </div>

                <div className="flex-1 md:ml-10 order-2 md:order-1">
                    <h3 className="text-2xl font-thin text-gray-500">
                        Why   <span className="text-teal-500 text-3xl">Byte Analytics Stands Out?</span>
                    </h3>
                    {/* <h3 className="text-teal-500 font-bold text-2xl mt-1">Stay in control of your AI</h3> */}
                    <p className="text-gray-600 text-sm mt-4 w-full md:w-3/4">
                        At Byte Analytics, our goal is to bring together top in-house talent and a global network of AI experts to apply advanced AI knowledge to solve real business challenges.
                        
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                        Byte Analytics is an equal opportunity employer committed to fair and inclusive hiring practices. We value talent, skills, and ambition without regard to race, religion, ethnicity, age, gender, sexual orientation or identity, medical condition, or socioeconomic background.
                    </p>
                    <p className="mt-2 text-sm text-gray-600">You are what makes us excel.</p>
                    <button className="px-5 py-2 mt-4 bg-[#605BAD] text-white text-xs rounded-md hover:bg-violet-900 shadow">
                        CONTACT US
                    </button>
                </div>
            </div>
        </section>
    )
}
