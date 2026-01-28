"use client";

import {
    Landmark,
    ShieldCheck,
    Bug,
    Headphones,
    ClipboardList,
    ListChecks,
    FileSpreadsheet,
    Tag,
    Repeat2,
    ScanSearch,
    FolderKanban,
    Calculator,
} from "lucide-react";

export default function AutomatedTasksSection() {
    const tasks = [
        { icon: <Landmark size={22} />, label: "Settlements" },
        { icon: <ShieldCheck size={22} />, label: "Regulatory compliance" },
        { icon: <Bug size={22} />, label: "Spam detection" },
        { icon: <Headphones size={22} />, label: "HR processes" },

        { icon: <ClipboardList size={22} />, label: "Clearances" },
        { icon: <Calculator size={22} />, label: "Accounting" },
        { icon: <FolderKanban size={22} />, label: "Organising documentation" },
        { icon: <ListChecks size={22} />, label: "Risk and compliance checks" },

        { icon: <FileSpreadsheet size={22} />, label: "Record maintenance" },
        { icon: <Tag size={22} />, label: "Invoice processing" },
        { icon: <ScanSearch size={22} />, label: "Wire transfers" },
        { icon: <Repeat2 size={22} />, label: "Due diligence processes" },
    ];

    return (
        <section className="py-20 bg-[#FAFAFA]">
            <div className="w-full lg:w-3/4 mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-light text-gray-700 mb-12">
                    Examples of tasks that can be automated include
                </h2>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8">
                    {tasks.map((task, idx) => (
                        <div
                            key={idx}
                            className={`
                                flex items-center gap-3 py-2
                                ${idx % 4 === 0 ? "" : ""}
                                ${idx % 4 === 0 ? "" : ""}
                                ${idx % 4 === 0 ? "" : ""}
                            `}
                        >
                            {/* vertical line */}
                            <span className="w-[2px] h-6 bg-gray-300"></span>

                            {/* Icon */}
                            <span className="text-[#605BAD]">{task.icon}</span>

                            {/* Text */}
                            <span className="text-gray-700 text-sm">
                                {task.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
