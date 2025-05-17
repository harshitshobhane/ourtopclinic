import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccess } from "./lib/routes";

// Define public routes that don't need authentication
const publicRoutes = ["/", "/about" , "/onboarding" , "/blog" , "/landing" , "about_us"];

// Define auth routes that should redirect to dashboard if user is already signed in
const authRoutes = ["/sign-in", "/sign-up"];

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
  const role =
    userId && sessionClaims?.metadata?.role
      ? sessionClaims.metadata.role.toLowerCase()
      : userId
      ? "patient"
      : "sign-in";

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