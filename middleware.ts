import { NextResponse, NextRequest } from "next/server";
import { isTokenExpired } from "./lib/utils";
import { getCurrentUser } from "./app/actions/user.action";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const isExpired = isTokenExpired(token || "");

  const hasOnLogin = request.url.includes("/login");
  const hasOnRegister = request.url.includes("/register");

  // If the user is not authenticated or token is expired, redirect to login or register page if not already on those pages
  if (!token || (token && isExpired)) {
    if (!hasOnLogin && !hasOnRegister) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }

  // If the user is on the login or register page and already has a valid token, redirect them to the home page or some other page
  if ((hasOnLogin || hasOnRegister) && token && !isExpired) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
