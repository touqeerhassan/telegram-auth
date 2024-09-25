import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("auth");

  if (!isAuthenticated && request.url.includes("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && request.url.includes("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
