import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccess } from "./lib/routes";

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);

  console.log("Session claims:", sessionClaims); // Debug log

  const role =
    userId && sessionClaims?.metadata?.role
      ? sessionClaims.metadata.role.toLowerCase()
      : userId
      ? "patient"
      : "sign-in";

  console.log("User role:", role); // Debug log

  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    console.log("Unauthorized access attempt. Redirecting to:", `/${role}`); // Debug log
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};