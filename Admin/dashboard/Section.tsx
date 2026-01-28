"use client";

import { useRouter } from "next/navigation";
import { Briefcase, FilePlus, Mail, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Middle Section - Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition border-l-4 border-blue-600"
          onClick={() => router.push("/admin/job-posting")}>
          <div className="flex items-center gap-4">
            <FilePlus className="text-blue-600" size={36} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Post Job</h3>
              <p className="text-gray-500 text-sm">Create and publish new job openings.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition border-l-4 border-green-600"
          onClick={() => router.push("/admin/job-list")}>
          <div className="flex items-center gap-4">
            <Briefcase className="text-green-600" size={36} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">View Posted Jobs</h3>
              <p className="text-gray-500 text-sm">Manage all active job listings.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition border-l-4 border-orange-600"
          onClick={() => router.push("/admin/contact-messages")}>
          <div className="flex items-center gap-4">
            <Mail className="text-orange-600" size={36} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">View Contact Messages</h3>
              <p className="text-gray-500 text-sm">Check all user inquiries and messages.</p>
            </div>
          </div>
        </div>

         {/* ⭐ NEW — View Applications */}
        <div
          className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition border-l-4 border-purple-600"
          onClick={() => router.push("/admin/applications/list")}
        >
          <div className="flex items-center gap-4">
            <Briefcase className="text-purple-600" size={36} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">View Applications</h3>
              <p className="text-gray-500 text-sm">See all job applications submitted by users.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section - Footer */}
      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} Admin Panel • Managed Dashboard
      </div>
    </div>
  );
}


// "use client";

// import { useRouter } from "next/navigation";

// export default function AdminDashboard() {
//   const router = useRouter();

//   async function logout() {
//     await fetch("/api/admin/logout", { method: "POST" });
//     router.push("/admin/login");
//   }

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

//       <button
//         onClick={logout}
//         className="bg-red-600 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//       <div className="mt-6 space-y-3">
//         <a href="/admin/job-posting" className="text-blue-600 underline block">
//           ➤ Post Job
//         </a>

//         <a href="/admin/job-list" className="text-blue-600 underline block">
//           ➤ View Posted Jobs
//         </a>

//         <a href="/admin/contact-messages" className="text-blue-600 underline block">
//           ➤ View Contact Messages
//         </a>
//       </div>
//     </div>
//   );
// }
