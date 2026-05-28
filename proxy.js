import { NextResponse } from "next/server";

export function proxy(request) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const isLocalDevHost = hostname === "localhost" || hostname === "127.0.0.1";
  const isAdminHost = hostname === "admin.zest.horse" || isLocalDevHost;

  if (!isAdminHost || request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/"]
};
