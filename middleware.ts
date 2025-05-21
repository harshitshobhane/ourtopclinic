import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccess } from "./lib/routes";

type UserMetadata = {
  role?: string;
  status?: 'pending' | 'approved' | 'rejected';
  doctorId?: string;
};

// Define public routes that don't need authentication
const publicRoutes = [
  "/", 
  "/onboarding", 
  "/blog", 
  "/landing", 
  "/about_us", 
  "/partner-with-us",
  "/contact",
  "/sign-up/sso-callback",
  "/doctor-registration",
  "/doctor-registration/pending"
];

// Define auth routes that should redirect to dashboard if user is already signed in
const authRoutes = ["/sign-in", "/sign-up"];

// Define registration routes that should be accessible without role
const registrationRoutes = ["/doctor-registration", "/patient/registration"];

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);
  const path = url.pathname;

  // Allow access to public routes
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Allow access to registration routes if user is authenticated
  if (registrationRoutes.includes(path) && userId) {
    return NextResponse.next();
  }

  // Handle auth routes (sign-in, sign-up)
  if (authRoutes.includes(path)) {
    if (userId) {
      // If user is signed in, redirect to their dashboard based on role
      const role = sessionClaims?.metadata?.role?.toLowerCase() || "patient";
      return NextResponse.redirect(new URL(`/${role}`, url.origin));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  const role = userId && sessionClaims?.metadata?.role
    ? sessionClaims.metadata.role.toLowerCase()
    : "onboarding";  // Keep as string for type safety

  // If user has no role and is trying to access onboarding, allow it
  if (role === "onboarding" && path === '/onboarding') {
    return NextResponse.next();
  }

  // If user has no role and is not on onboarding, redirect to onboarding
  if (role === "onboarding" && path !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', url.origin));
  }

  // If user has a role and tries to access onboarding, redirect to their dashboard
  if (role !== "onboarding" && path === '/onboarding') {
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  // Special handling for doctors with pending status
  const metadata = sessionClaims?.metadata as UserMetadata | undefined;
  if (role === 'doctor' && metadata?.status === 'pending') {
    return NextResponse.redirect(new URL('/doctor-registration/pending', url.origin));
  }

  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};