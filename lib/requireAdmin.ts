import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function isAdminRequest() {
  const jar = await cookies();
  return jar.get("admin_logged_in")?.value === "true";
}

export async function assertAdmin() {
  const isLoggedIn = await isAdminRequest();

  if (!isLoggedIn) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
