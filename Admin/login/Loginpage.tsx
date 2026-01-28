"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function login() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return res.json();
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    setErrorMsg("");

    const result = await login();
    console.log(result);

    if (!result.success) {
      setErrorMsg("Invalid email or password");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-6 w-full max-w-sm bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // 👉 1. This function ONLY calls the API
//   async function login() {
//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     return await res.json(); // return the API response
//   }

//   // 👉 2. This function handles complete login logic
//   async function handleLogin(e: any) {
//     e.preventDefault();
//     setErrorMsg("");

//     const result = await login(); // call the API helper function
//     console.log("result",result)

//     if (!result.success) {
//       setErrorMsg("Invalid email or password");
//       return;
//     }

//     // Save session (optional)
//     localStorage.setItem("admin_logged_in", "true");

//     // Redirect to dashboard
//     router.push("/admin/dashboard");
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="p-6 w-full max-w-sm bg-white shadow-lg rounded-lg space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">Admin Login</h2>

//         {errorMsg && <p className="text-red-600">{errorMsg}</p>}

//         <input
//           type="email"
//           placeholder="Admin Email"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
