"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
  company?: string;
  location?: string;
  description?: string;
};

export default function JobList() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadJobs() {
    setLoading(true);
    const res = await fetch("/api/job-list");
    const data = await res.json();
    if (data.success) setJobs(data.jobs);
    setLoading(false);
  }

  async function deleteJob(id: string) {
    if (!confirm("Are you sure you want to delete this job?")) return;

    const res = await fetch(`/api/job-list/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      alert("Job deleted!");
      loadJobs();
    } else {
      alert("Error deleting job");
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Posted Jobs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md border rounded-xl p-6"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-600">{job.company} — {job.location}</p>

              <p className="mt-3 text-gray-800">{job.description}</p>

              {/* <div className="flex gap-4 mt-4">
                <button
                  onClick={() => router.push(`/admin/job-list/edit/${job.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteJob(job.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button> */}
              {/* </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
