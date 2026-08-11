import { NextResponse, NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  // Redirect to login page if not authenticated
  // return NextResponse.redirect(new URL("/tech-pulse", request.url))
}

export const config = {
  // matcher: "/",
}
