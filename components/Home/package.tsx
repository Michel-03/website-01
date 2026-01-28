"use client";

export default function Package() {
    const packages = [
        {
            title: "Discover",
            description: "Explore AI opportunities and start developing your first function.",
            bgColor: "bg-[#605BAD]",
            who: "A business that is at the beginning of its journey with AI, ready to explore opportunities.",
            team: [
                "1 Technical PM",
                "1 Strategic Value Consultant",
                "1 PhD-level AI Expert",
                "1 Data/ML Engineer",
            ],
            hours: "40h–50h"
        },
        {
            title: "Accelerate",
            description: "Develop and integrate custom AI solutions into your business.",
            bgColor: "bg-[#605BAD]",
            who: "A business that has a good idea for how they want to use AI and needs help with execution.",
            team: [
                "1 Technical PM",
                "1 Strategic Value Consultant",
                "1 PhD-level AI Expert",
                "1 Data/ML Engineer",
            ],
            hours: "100h–120h"
        },
        {
            title: "Pioneer",
            description: "Lead your industry with innovative AI applications for Update.",
            bgColor: "bg-[#605BAD]",
            who: "A business that wants to be first to market with custom AI solutions and stay ahead of competition.",
            team: [
                "1 Technical PM",
                "1 Strategic Value Consultant",
                "1 PhD-level AI Expert",
                "1 Data Engineer",
                "1 ML Engineer",
            ],
            hours: "220h–260h"
        }
    ];

    return (
        <section className="py-16 bg-white px-4">
            <h2 className="text-3xl text-left font-thin text-gray-700 mb-2 ml-45 ">
                Ready to get started?{" "}
                <span className="text-teal-600 font-bold">See which package is for you.</span>
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:max-w-[75%] mx-auto">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="
                            border border-gray-400 rounded-xl shadow-sm hover:shadow-lg transition
                            flex flex-col overflow-hidden bg-white
                        "
                    >
                        {/* TOP SECTION */}
                        <div className={`${pkg.bgColor} text-white text-center p-6`}>
                            <h3 className="text-xl font-semibold">{pkg.title}</h3>
                            <p className="text-sm mt-2 opacity-90">{pkg.description}</p>
                        </div>

                        {/* CONTENT SECTION */}
                        <div className="p-4 flex-1 text-gray-700">
                            <p className="font-semibold">Who is this for?</p>
                            <p className="text-sm mt-1 mb-4">{pkg.who}</p>

                            <p className="font-semibold mt-4">Your AI Team</p>
                            <ul className="mt-2 space-y-1 text-sm">
                                {pkg.team.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-green-500 font-bold">✓</span> {t}
                                    </li>
                                ))}
                            </ul>

                            <p className="font-semibold mt-6">AI support hours per month</p>
                            <p className="text-sm mt-1">{pkg.hours}</p>
                        </div>

                        {/* BUTTON */}
                        <div className="p-5">
                            {/* <button className="w-full bg-[#605BAD] text-white text-xs py-2 rounded-lg hover:bg-purple-700 transition mx-auto block">
                                CONTACT US
                            </button> */}
                            <a
                                href="#contact"
                                className="w-full bg-[#605BAD] text-white text-xs py-2 rounded-lg hover:bg-purple-700 transition mx-auto block text-center"
                            >
                                CONTACT US
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
