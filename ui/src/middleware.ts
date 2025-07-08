import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  //   if (!token) {
  //     console.error("no token md.ts"); // ⬅️ optional debug
  //     return NextResponse.redirect(new URL("/md", req.url));
  //   }

  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/me`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) {
  //       console.error("Auth check failed  md.ts:", res.status); // ⬅️ optional debug
  //       return NextResponse.redirect(new URL("/md", req.url));
  //     }

  //     const user = await res.json();

  //     // Role check
  //     if (
  //       req.nextUrl.pathname.startsWith("/admin") &&
  //       (user.role as string).toLowerCase() !== "admin"
  //     ) {
  //       return NextResponse.redirect(new URL("/error/unauthorised", req.url));
  //     }
  //   } catch (error) {
  //     console.error("Middleware auth error:", error);
  //     return NextResponse.redirect(new URL("/md", req.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply to these routes
};
