import AdminDashboard from "../../../Admin/dashboard/Section";

export default function Dashboard(){
    return(
        <>
        <AdminDashboard/>
        </>
    )
}


// "use client";
// import { useRouter } from "next/navigation";

// export default function AdminDashboard() {
//   const router = useRouter();

//   // Check if admin is logged in
//   if (typeof window !== "undefined") {
//     const loggedIn = localStorage.getItem("admin_logged_in");
//     if (!loggedIn) {
//       router.push("/admin/login");
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem("admin_logged_in");
//     router.push("/admin/login");
//   };

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
