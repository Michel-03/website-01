import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/adminSession";

export async function isAdminRequest() {
  const jar = await cookies();
  const session = await verifyAdminSession(jar.get(ADMIN_SESSION_COOKIE)?.value);
  return session !== null;
}

export async function assertAdmin() {
  const isLoggedIn = await isAdminRequest();

  if (!isLoggedIn) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
