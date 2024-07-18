import { NextResponse, NextRequest } from "next/server";
import { isTokenExpired } from "./lib/utils";
import { getCurrentUser } from "./app/actions/user.action";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const isExpired = isTokenExpired(token || "");

  const hasOnLogin = request.url.includes("/login");
  const hasOnRegister = request.url.includes("/register");

  if ((!token || (token && isExpired)) && (!hasOnLogin || !hasOnRegister)) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
