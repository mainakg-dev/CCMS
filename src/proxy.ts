import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Route definitions
const PUBLIC_ROUTES = ["/login", "/student-login"];
const ADMIN_ROUTES = [
  "/dashboard",
  "/enrollments",
  "/exams",
  "/courses",
  "/centers",
  "/enquiries",
  "/coordinators",
  "/notices",
  "/settings",
];
const CENTER_ROUTES = [
  "/dashboard",
  "/enrollments",
  "/exams",
  "/courses",
  "/notices",
  "/settings",
];
const STUDENT_ROUTES = ["/student-portal", "/settings"];

function getRouteAccess(pathname: string) {
  // Check if it matches any known route prefix
  for (const route of ADMIN_ROUTES) {
    if (pathname.startsWith(route)) return "DASHBOARD";
  }
  if (pathname.startsWith("/student-portal")) return "STUDENT";
  return null;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Read auth state from cookie
  const authCookie = request.cookies.get("ccms-auth")?.value;
  let user: { role?: string } | null = null;

  // if (authCookie) {
  //   try {
  //     const parsed = JSON.parse(authCookie);
  //     user = parsed?.state?.user || null;
  //   } catch {
  //     user = null;
  //   }
  // }
  user = {
    role: "ADMIN",
  };

  const isAuthenticated = !!user;
  const userRole = user?.role;

  // Public routes: redirect to dashboard if already authenticated
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    if (isAuthenticated) {
      const redirectTo =
        userRole === "STUDENT" ? "/student-portal" : "/dashboard";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.next();
  }

  // Root: redirect based on auth state
  if (pathname === "/") {
    if (isAuthenticated) {
      const redirectTo =
        userRole === "STUDENT" ? "/student-portal" : "/dashboard";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protected routes: redirect to login if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  const routeAccess = getRouteAccess(pathname);

  if (routeAccess === "DASHBOARD") {
    // STUDENT cannot access dashboard routes
    if (userRole === "STUDENT") {
      return NextResponse.redirect(new URL("/student-portal", request.url));
    }
    // CENTER can only access CENTER_ROUTES
    if (userRole === "CENTER") {
      const allowed = CENTER_ROUTES.some((r) => pathname.startsWith(r));
      if (!allowed) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  if (routeAccess === "STUDENT") {
    // Only STUDENT can access student portal
    if (userRole !== "STUDENT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
