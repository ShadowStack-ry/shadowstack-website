import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pre-launch placeholder: every site route renders /coming-soon.
// The Sanity Studio (/studio) stays reachable. Delete this file to go live.
export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: [
    // everything except Next internals, the studio, the placeholder itself,
    // and static files (anything with an extension, e.g. favicon.ico)
    "/((?!_next/|studio|coming-soon|.*\\..*).*)",
  ],
};
