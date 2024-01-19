import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  return res;
};

export const config = {
  matcher: ["/board/:path*"],
};
