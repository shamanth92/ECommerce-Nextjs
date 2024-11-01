import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("token: ", token);
  if (!token) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: [
    "/login/mfa",
    "/account",
    "/products",
    "/products/:path*",
    "/products/favorites",
    "/products/checkout",
    "/orders",
    "/help",
  ],
};
