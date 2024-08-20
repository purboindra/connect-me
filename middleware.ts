import { NextResponse, NextRequest } from "next/server";
import { isTokenExpired } from "./lib/utils";
import { refreshToken } from "./app/actions/auth.action";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const token = request.cookies.get("access_token");

  const hasOnLogin = request.url.includes("/login");
  const hasOnRegister = request.url.includes("/register");

  const response = NextResponse.next();

  if (!token && hasOnLogin)
    return NextResponse.rewrite(new URL("/login", request.url));

  if (!token && hasOnRegister)
    return NextResponse.rewrite(new URL("/register", request.url));

  if (token) {
    const expired = isTokenExpired(token!.value);
    if (expired) {
      const refresh = await refreshToken();

      console.log("response refresh middlewar", refresh);

      if (refresh === null) {
        return NextResponse.rewrite(new URL("/login", request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("access_token", `${refresh.access_token}`);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.set("access_token", refresh.access_token, { path: "/" });
      response.cookies.set("refresh_token", refresh.refresh_token, {
        path: "/",
      });

      // Ensure the response is not cached
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      );

      console.log("Updated tokens in middleware:", refresh.access_token);

      return response;
    }
  }

  // If the user is on the login or register page and already has a valid token, redirect them to the home page or some other page
  if ((hasOnLogin || hasOnRegister) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
