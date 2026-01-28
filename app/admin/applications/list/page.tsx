"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
    const router = useRouter();
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/applications/list");
      const data = await res.json();
      if (data.success) setApplications(data.data);
    }
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Job Applications</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left font-semibold">Applicant</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Phone</th>
              <th className="p-4 text-left font-semibold">Job Applied</th>
              <th className="p-4 text-left font-semibold">Status</th>
              <th className="p-4 text-left font-semibold">Experience</th>
              <th className="p-4 text-left font-semibold">Resume</th>
              <th className="p-4 text-left font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app: any) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{app.applicant_name}</td>
                <td className="p-4">{app.applicant_email}</td>
                <td className="p-4">{app.applicant_phone}</td>
                <td className="p-4 font-semibold">{app.job_slug}</td>
                <td className="p-4 font-semibold">{app.stage}</td>
                <td className="p-4">{app.total_experience}</td>
                <td className="p-4">
                  <a
                    href={app.resume_url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="p-4">
                  {new Date(app.created_at).toLocaleDateString()}
                    <button
                        onClick={() => router.push(`/admin/applications/${app.id}`)}
                        className="text-purple-600 underline ml-4"
                    >
                        View
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
