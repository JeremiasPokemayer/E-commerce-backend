export const runtime = "edge";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.method === "OPTIONS") {
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, X-Requested-With"
    );
    res.headers.set("Vary", "Access-Control-Request-Headers");
    res.headers.set("Content-Length", "0");
    res.headers.set("Content-Type", "text/plain");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
