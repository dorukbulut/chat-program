import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authCookie = request.cookies.get("chat_app_authentication")?.value;
  if (authCookie) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/dashboard/:path*"] };
