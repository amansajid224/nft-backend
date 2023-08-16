// middleware.ts
import { NextResponse } from "next/server";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./components/Routes";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
  const user = request.cookies.get("user")?.value;
  // const is2FaEnabled = request.cookies.get("is2FaEnabled")?.value;
  if (
    PRIVATE_ROUTES.includes(request.nextUrl.pathname) &&
    !token &&
    !isAuthenticated &&
    !user
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    PUBLIC_ROUTES.includes(request.nextUrl.pathname) &&
    token &&
    isAuthenticated &&
    user
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
