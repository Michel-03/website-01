"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CareersJobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      const res = await fetch("/api/jobs");
      const data = await res.json();

      if (data.success) setJobs(data.data);
    }
    loadJobs();
  }, []);

  return (
    <section className="py-16 w-full bg-gray-50">
      {/* CONTAINER (75% width like Join) */}
      <div className="lg:max-w-[75%] mx-auto p-6">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-10 text-gray-700">Open Positions</h1>

        {/* No jobs */}
        {jobs.length === 0 && (
          <p className="text-gray-600 text-center">No jobs available at the moment.</p>
        )}

        {/* Table wrapper */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Position</th>
                <th className="p-4 text-left font-semibold text-gray-700">Salary</th>
                <th className="p-4 text-left font-semibold text-gray-700">Location</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job: any) => (
                <tr
                  key={job.id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-4">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="text-[#605BAD] hover:underline"
                    >
                      {job.title}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-700">{job.salary}</td>
                  <td className="p-4 text-gray-700">{job.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact box */}
        <div className="mt-10 text-center">
          <Link href="/contact" className="text-[#605BAD] text-sm hover:underline">
            Didn’t see your dream job? Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
