import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminSession";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const expired = {
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };

  response.cookies.set({ name: ADMIN_SESSION_COOKIE, ...expired });
  response.cookies.set({ name: "admin_logged_in", ...expired });
  return response;
}
