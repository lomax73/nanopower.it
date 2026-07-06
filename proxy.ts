import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const nonApprovatoPath = "/area-tecnici/non-approvato";

  if (!token.approvato && pathname !== nonApprovatoPath) {
    return NextResponse.redirect(new URL(nonApprovatoPath, req.url));
  }

  if (token.approvato && pathname === nonApprovatoPath) {
    return NextResponse.redirect(new URL("/area-tecnici", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/area-tecnici/:path*"],
};
