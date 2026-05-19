import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Since we use custom HS256 JWTs for Spring Boot compatibility, 
  // NextAuth's default withAuth middleware fails on the Edge runtime.
  // We simply check for the presence of the session cookie here.
  const hasCookie = request.cookies.has("next-auth.session-token") || 
                    request.cookies.has("__Secure-next-auth.session-token");

  if (!hasCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
