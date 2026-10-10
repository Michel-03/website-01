import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_MAX_AGE,
  adminSessionCookie,
  createAdminSession,
  getSessionSecret,
} from "@/lib/adminSession";
import { clearLoginAttempt, consumeLoginAttempt } from "@/lib/loginRateLimit";
import { getLocalAdminCredentials } from "@/lib/localAdmin";
import { hashPassword, isPasswordHash, safeEqual, verifyPassword } from "@/lib/password";
import { getSupabase } from "@/lib/supabaseclient";

function matchesLocalAdmin(email: string, password: string) {
  const credentials = getLocalAdminCredentials();
  const adminEmail = credentials.email.trim().toLowerCase();
  const adminPassword = credentials.password;

  if (!adminEmail || !adminPassword) return false;
  return safeEqual(email.trim().toLowerCase(), adminEmail) && safeEqual(password, adminPassword);
}

function attemptKey(request: Request, email: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return `${ip}:${email.trim().toLowerCase()}`;
}

async function authenticateDatabaseAdmin(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, password")
    .eq("email", email.trim())
    .maybeSingle();

  if (error) return { status: "unavailable" as const };
  if (!data?.password || !(await verifyPassword(password, data.password))) {
    return { status: "invalid" as const };
  }

  if (!isPasswordHash(data.password)) {
    const hashed = await hashPassword(password);
    await supabase.from("admin_users").update({ password: hashed }).eq("id", data.id);
  }

  return { status: "ok" as const, email: String(data.email || email) };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "");
    const password = String(body.password ?? "");
    const key = attemptKey(request, email);
    const limit = consumeLoginAttempt(key);

    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    if (!email.trim() || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!getSessionSecret()) {
      return NextResponse.json(
        { success: false, error: "Admin login is not connected. Add ADMIN_SESSION_SECRET." },
        { status: 503 }
      );
    }

    let authenticatedEmail = "";

    if (matchesLocalAdmin(email, password)) {
      authenticatedEmail = email.trim().toLowerCase();
    } else {
      try {
        const result = await authenticateDatabaseAdmin(email, password);
        if (result.status === "unavailable") {
          return NextResponse.json(
            { success: false, error: "The admin database could not be reached." },
            { status: 503 }
          );
        }
        if (result.status === "ok") authenticatedEmail = result.email;
      } catch {
        const credentials = getLocalAdminCredentials();
        if (!credentials.email || !credentials.password) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Admin login is not connected. Add ADMIN_EMAIL and ADMIN_PASSWORD, or the Supabase admin_users credentials.",
            },
            { status: 503 }
          );
        }
      }
    }

    if (!authenticatedEmail) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    clearLoginAttempt(key);
    const response = NextResponse.json({ success: true });
    response.cookies.set(adminSessionCookie(await createAdminSession(authenticatedEmail), ADMIN_SESSION_MAX_AGE));
    response.cookies.set({
      name: "admin_logged_in",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
