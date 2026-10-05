import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pemeriksaan optimistis: tanpa cookie sesi, arahkan ke /login.
// Verifikasi sesi dan peran yang sebenarnya ada di src/lib/dal.ts.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("sesi")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
