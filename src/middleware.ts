import { NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/settings", "/play"];
const apiAuthPrefix = "/api/auth";
const DEFAULT_LOGIN_REDIRECT = "/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isAuthorized = !!session?.user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isListedProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.includes(route),
  );

  if (isApiAuthRoute) return;

  if (!isAuthorized && isListedProtectedRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
});

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|offline|offline.html|~offline).*)",
};
