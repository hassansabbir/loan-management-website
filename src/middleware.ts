import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for protecting authenticated routes
 * Prevents unauthenticated users from accessing /dashboard and subroutes
 */
export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname === "/payouts" ||
    pathname === "/transactions";

  // If attempting to access a protected route without a token -> Redirect to /sign-in
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If already authenticated and visiting sign-in / login -> Redirect to /dashboard
  if ((pathname === "/sign-in" || pathname === "/login") && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/payouts/:path*",
    "/transactions/:path*",
    "/sign-in",
    "/login",
  ],
};
