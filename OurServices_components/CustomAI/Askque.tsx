"use client";
import { BarChart2, Code2, Cog, RefreshCcw, Atom } from "lucide-react";

const roles = [
    {
        description: "In the last 20 years, how many times have we spoken to this client?"
    },
    {
    description:
      "What is the total advertising spend on this product line since 2011?",
  },
  {
    description:
      "Make comparison between company X and company Y based on Z?",
  },
  {
    description:
      "List every time person X is mentioned in documentation?",
  },
  {
    description:
      "How many investments did X make in Y in the past Z years?",
  },
  {
    description:
      "What would X person do in this situation?",
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
                        
                            <div className="my-auto">
                                <p className="text-sm text-gray-600 leading-relaxed">
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