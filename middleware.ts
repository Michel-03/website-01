import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    console.log("MIDDLEWARE RUNNING → Path:", req.nextUrl.pathname);
  const pathname = req.nextUrl.pathname;

  // Allow login page and login API
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login")
  ) {
    console.log("RETURNED THE DATA")
    return NextResponse.next();
  }

  // PROTECT ALL ADMIN ROUTES
  if (pathname.startsWith("/admin")) {
    const isLoggedIn = req.cookies.get("admin_logged_in")?.value === "true";

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
