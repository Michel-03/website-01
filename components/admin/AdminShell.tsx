"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  FilePlus,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, match: "/admin/dashboard" },
  { href: "/admin/job-posting", label: "Post a role", icon: FilePlus, match: "/admin/job-posting" },
  { href: "/admin/job-list", label: "Jobs", icon: Briefcase, match: "/admin/job-list" },
  { href: "/admin/applications/list", label: "Applications", icon: Users, match: "/admin/applications" },
  { href: "/admin/contact-messages", label: "Inquiries", icon: Mail, match: "/admin/contact-messages" },
  { href: "/admin/links", label: "Web links", icon: Link2, match: "/admin/links" },
  { href: "/admin/blogs", label: "Blog", icon: Newspaper, match: "/admin/blogs" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f4f5f8] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-black/5 bg-[#161326] text-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="px-6 py-6">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-300">Byte Analytics</p>
          <h1 className="mt-2 text-xl font-semibold">Admin</h1>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-4 lg:block lg:space-y-1 lg:px-3">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.match || pathname.startsWith(`${item.match}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2 text-sm ${
                  active ? "bg-white text-[#161326]" : "text-white/75 hover:bg-white/10"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-2 px-3 pb-4 lg:block lg:space-y-1 lg:pb-6">
          <button
            onClick={logout}
            className="flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10"
          >
            <LogOut size={16} />
            Log out
          </button>
          <Link href="/" className="flex items-center whitespace-nowrap rounded-xl px-3 py-2 text-sm text-white/45 hover:bg-white/10">
            View public site
          </Link>
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
