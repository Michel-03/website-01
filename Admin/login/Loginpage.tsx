"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json();

      if (!result.success) {
        setErrorMsg(result.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setErrorMsg("The login service did not respond.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f5f8] px-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-xl md:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-[#161326] p-10 text-white md:block">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-300">Byte Analytics</p>
          <h1 className="mt-6 text-3xl font-semibold leading-tight">Careers, inquiries, and the public site.</h1>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Sign in to publish roles, review candidates, and answer people who wrote through the website.
          </p>
        </div>
        <form onSubmit={handleLogin} className="p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#605BAD]">Admin</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#221c4a]">Sign in</h2>
          {errorMsg && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>}
          <label className="mt-6 block">
            <span className="text-sm font-medium text-[#221c4a]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-[#221c4a]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#605BAD]"
            />
          </label>
          <button disabled={loading} className="mt-6 w-full rounded-full bg-[#221c4a] py-3 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? "Checking access…" : "Sign in"}
          </button>
          <Link href="/" className="mt-4 block text-center text-sm text-gray-500">
            Back to the website
          </Link>
        </form>
      </div>
    </div>
  );
}
