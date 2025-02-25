import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const isApiRoute = nextUrl.pathname.startsWith("/api/")

    if (isApiRoute) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.next();
    } else {
        return auth((req: NextRequest) => {
            const isAuthenticated = !!((req as any).auth);
            const isPublicRoute = ["/", "/signin", "/signup"].includes(nextUrl.pathname);

            if (!isAuthenticated && nextUrl.pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/signin", nextUrl));
            }

            if (isAuthenticated && nextUrl.pathname === "/signin") {
                return NextResponse.redirect(new URL("/dashboard", nextUrl));
            }

            return NextResponse.next();
        })(req);
    }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)", 
        "/getpass/:path*",
        "/pass/:path*",
    ],
};
