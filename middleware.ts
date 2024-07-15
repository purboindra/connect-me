import { NextResponse, NextRequest } from "next/server";
import { isTokenExpired } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const hasOnLogin = request.url.includes("/login");
  const hasOnRegister = request.url.includes("/register");

  // if (!token && !hasOnLogin && !hasOnRegister) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  console.log("req.nextUrl.pathname", request.nextUrl.pathname);

  const isExpired = isTokenExpired(token || "");

  // if (isExpired && !hasOnLogin && !hasOnRegister) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if ((hasOnLogin || hasOnRegister) && token && !isExpired) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
