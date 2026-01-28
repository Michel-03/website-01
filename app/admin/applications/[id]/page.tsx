"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ApplicationDetail() {
  const params = useParams();        // <-- client-safe
  const id = params?.id as string | undefined;

  const router = useRouter();

  console.log("CLIENT useParams:", params);

  if (!id) {
    return <div className="p-10 text-red-500 text-xl">ID NOT RECEIVED</div>;
  }

  const [application, setApplication] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("");

  const statuses = ["applied", "reviewed", "shortlisted", "rejected", "hired"];

  useEffect(() => {
    async function loadApp() {
      try {
        const res = await fetch(`/api/applications/get?id=${id}`);
        const data = await res.json();
        console.log("GET app response:", data);
        if (data.success) {
          setApplication(data.data);
          setStatus(data.data.stage);
        } else {
          // handle not found or error
          console.error("Error fetching application:", data.message);
        }
      } catch (err) {
        console.error("Fetch failed", err);
      }
    }
    loadApp();
  }, [id]);

  async function updateStatus() {
    setUpdating(true);
    try {
      const res = await fetch("/api/applications/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stage: status }),
      });
      const data = await res.json();
      setUpdating(false);
      if (data.success) {
        alert("Status updated!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      setUpdating(false);
      console.error(err);
      alert("Network error");
    }
  }

  if (!application) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <button onClick={() => router.back()} className="text-blue-600 underline mb-6">
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Application Details</h1>

      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <DetailRow label="Applicant Name" value={application.applicant_name} />
        <DetailRow label="Email" value={application.applicant_email} />
        <DetailRow label="Phone" value={application.applicant_phone} />
        <DetailRow label="Job Title" value={application.job_title} />
        <DetailRow label="Experience" value={application.total_experience} />
        <DetailRow label="Skills" value={application.skills} isLong />
        <DetailRow label="Cover Letter" value={application.cover_letter} isLong />
        <DetailRow
          label="Resume"
          value={
            application.resume_url ? (
              <a href={application.resume_url} target="_blank" className="text-blue-600 underline">
                View Resume
              </a>
            ) : (
              <span className="text-gray-500">No resume</span>
            )
          }
        />

        <div className="mt-6">
          <label className="font-semibold block mb-2">Application Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded-lg">
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={updateStatus}
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, isLong = false }: any) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p className={`text-gray-700 ${isLong ? "whitespace-pre-wrap" : ""}`}>{value}</p>
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ApplicationDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = params.id;
//   console.log("PARAMS RECEIVED:", params);

//   const router = useRouter();
//   console.log("PARAMS RECEIVED:", params);
//   if (!id) {
//     return <div className="p-10 text-red-500 text-xl">ID NOT RECEIVED</div>;
//     }



//   const [application, setApplication] = useState<any>(null);
//   const [updating, setUpdating] = useState(false);

//   const [status, setStatus] = useState("");

//   const statuses = ["applied", "reviewed", "shortlisted", "rejected", "hired"];

//   useEffect(() => {
//     async function loadApp() {
//       const res = await fetch(`/api/applications/get?id=${id}`);
//       const data = await res.json();
//       console.log("data came from db",data)
//       if (data.success) {
//         setApplication(data.data);
//         setStatus(data.data.stage);
//       }
//     }
//     loadApp();
//   }, [id]);

//   async function updateStatus() {
//     setUpdating(true);

//     const res = await fetch("/api/applications/update-status", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, stage: status })
//     });

//     const data = await res.json();

//     setUpdating(false);

//     if (data.success) {
//       alert("Status updated!");
//     } else {
//       alert("Error: " + data.message);
//     }
//   }

//   if (!application) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <button
//         onClick={() => router.back()}
//         className="text-blue-600 underline mb-6"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6">Application Details</h1>

//       <div className="bg-white shadow p-6 rounded-xl space-y-4">

//         <DetailRow label="Applicant Name" value={application.applicant_name} />
//         <DetailRow label="Email" value={application.applicant_email} />
//         <DetailRow label="Phone" value={application.applicant_phone} />
//         <DetailRow label="Job Title" value={application.job_title} />
//         <DetailRow label="Experience" value={application.total_experience} />
//         <DetailRow label="Skills" value={application.skills} isLong />
//         <DetailRow label="Cover Letter" value={application.cover_letter} isLong />

//         <DetailRow
//           label="Resume"
//           value={
//             <a
//               href={application.resume_url}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               View Resume
//             </a>
//           }
//         />

//         {/* Status Selector */}
//         <div className="mt-6">
//           <label className="font-semibold block mb-2">Application Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border p-2 rounded-lg"
//           >
//             {statuses.map((s) => (
//               <option key={s} value={s}>
//                 {s[0].toUpperCase() + s.slice(1)}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={updateStatus}
//             className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//             disabled={updating}
//           >
//             {updating ? "Updating..." : "Update Status"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// function DetailRow({ label, value, isLong = false }: any) {
//   return (
//     <div>
//       <p className="font-semibold">{label}</p>
//       <p className={`text-gray-700 ${isLong ? "whitespace-pre-wrap" : ""}`}>
//         {value}
//       </p>
//     </div>
//   );
// }
