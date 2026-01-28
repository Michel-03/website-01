"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Kasia Borowska",
    role: "Managing Director. MSc in Cognitive Science, BSc in Maths",
    image: "/team/gen.jpg",
    linkedin: "#",
  },
  {
    name: "Dr. Peter Bebbington",
    role:
      "CTO, PhD in Physics and Astronomy MRes in Financial Computing, MSc Complex Systems, MPhys Physics",
    image: "/team/gen.jpg",
    linkedin: "#",
  },
  {
    name: "Philip Treleaven",
    role:
      "Professor & Director of UK Financial Computing Centre at University College London",
    image: "/team/gen.jpg",
    linkedin: "#",
  },
  {
    name: "Osama Ishtaiwi",
    role:
      "Diagnostic Cardiology Modality Manager Middle East, Africa, Turkey & Central Asia",
    image: "/team/gen.jpg",
    linkedin: "#",
  },
  {
    name: "Martin Ward",
    role:
      "Head of Business Development & Innovation EMEA, Oracle",
    image: "/team/gen.jpg",
    linkedin: "#",
  },
  {
    name: "Moritz Haller",
    role: "Backend Developer",
    image: "/team/gen.jpg",
    linkedin: "#",
  },
];


export default function OurBoard() {
    return (
    <section className="w-full bg-white py-20">
      <div className="lg:max-w-[75%] mx-auto px-6">

        {/* Top Title + Contact Button */}
        <div className="flex justify-between items-start flex-col md:flex-row mb-16">
          <h2 className="text-2xl md:text-2xl font-light leading-snug text-gray-400 max-w-3xl">
            Our Board
            <p className="text-xs">Our board consists of VPs, C-suites, Partners and tech experts across Finance, IT, Software, Marketing and Healthcare industries.</p>
          </h2>
          <button className="bg-[#605BAD] text-white px-5 py-2 rounded-md hover:bg-violet-900 shadow transition-all mt-6 md:mt-0 text-xs">
            <a href="#contact">CONTACT US</a>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm pb-2 bg-white hover:shadow-md transition relative"
            >
              {/* TOP BORDER */}
              <div className="w-full h-2 bg-[#605BAD] rounded-t-lg"></div>

              {/* IMAGE */}
              <div className="flex justify-center mt-4">
                <div className="w-32 h-32 rounded-full border-3 border-teal-400 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* NAME */}
              <h3 className="text-center text-xl font-semibold mt-2 text-gray-700">
                {member.name}
              </h3>

              {/* ROLE */}
              <p className="text-center text-gray-600 px-6 mt-2 text-sm leading-relaxed">
                {member.role}
              </p>

              {/* LINKEDIN ICON */}
              <div className="flex justify-center mt-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin
                    size={22}
                    className="text-purple-700 hover:text-purple-900 transition"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex">  
            <h4 className="inline-block bg-gray-200 rounded-sm p-3 text-xs mt-5 flex mx-auto">Interested in joining our Team? <a href="/careers" className="text-blue-800">View Careers</a></h4>
        </div>

     </div>
    </section>

    )
}