import { type NextRequest, NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
    // const token = request.cookies.get("next-auth.session-token");
    // const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

    // if (!token && !isAuthPage) {
    //     const login_url = new URL("/signin", request.url);
    //     return NextResponse.redirect(new URL(login_url, request.url));
    // }

    return NextResponse.next();
}

export const config = { matcher: ["/"] };
