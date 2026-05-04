
import { NextRequest, NextResponse } from "next/server";
import { getSessionFromToken } from "./lib/auth-edge";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("checker-session")?.value;
  const { pathname } = request.nextUrl;

  const session = token ? await getSessionFromToken(token) : null;

  if (pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (pathname.startsWith("/checker")) {
    if (!session || session.user.role !== "CHECKER") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!session || session.user.role !== "USER") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
    matcher:  ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
  }