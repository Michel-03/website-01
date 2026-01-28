"use client";
import { BarChart2, Code2, Cog, RefreshCcw, Atom } from "lucide-react";

const roles = [
    {
        icon: <BarChart2 size={40} strokeWidth={1.5} className="text-purple-600"/>,
        title: "Research Scientist",
        subtitle: "Research academic literature",
        description: "Ideate new theories and problem-solving methods. Publish work reflecting theories and potential opportunities."
    },
    {
    icon: <Atom size={40} strokeWidth={1.5} className="text-purple-600" />,
    title: "Data Scientists",
    subtitle: "Review relevant data sources and finds correlations.",
    description:
      "Builds models that produce a predictive signal as an output of data analysis.",
  },
  {
    icon: <Code2 size={40} strokeWidth={1.5} className="text-purple-600" />,
    title: "Software Engineers",
    subtitle: "Convert code created by data scientist into production grade code.",
    description:
      "Create an application that is secure, runs fast and is scalable along the production pipeline.",
  },
  {
    icon: <Cog size={40} strokeWidth={1.5} className="text-purple-600" />,
    title: "Data Engineers",
    subtitle:
      "Create and connect data pipelines to all relevant data sources identified by the data scientist.",
    description:
      "Transform data into relevant format to get it ready for AI.",
  },
  {
    icon: <RefreshCcw size={40} strokeWidth={1.5} className="text-purple-600" />,
    title: "DevOps",
    subtitle:
      "Create a production pipeline to automate operations, minimizing need for human intervention.",
    description:
      "Place software developed by engineers into containers, ensure infrastructure is optimised.",
  },
];

export default function OurCommunity(){
    return(
        <section className="w-full py-12">
            <div className="lg:max-w-[75%] mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    roles.map((role, index) => (
                        <div 
                            key={index}
                            className="flex gap-4 p-6 border rounded-lg shadow-sm relative hover:shadow-md transition bg-white">
                            {/*purple left border*/}
                            <div className="absolute left-0 top-0 h-full w-2 bg-purple-600 rounded-l-lg"></div>

                            {/*Icon*/}
                            <div className="ml-4">{role.icon}</div>
                            {/* Text */}
                            <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {role.title}
                            </h3>

                            <p className="text-sm font-medium mt-1 text-gray-600">
                                {role.subtitle}
                            </p>

                            <p className="text-sm mt-3 text-gray-600 leading-relaxed">
                                {role.description}
                            </p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </section>
    )
}