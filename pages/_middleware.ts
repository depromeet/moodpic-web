import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const baseUrl = new URL(req.url).origin;
  if (!req.url.includes(`${baseUrl}/oauth`) && !req.url.includes('/share/post') && !req.cookies.authToken) {
    return NextResponse.redirect(`${baseUrl}/oauth`);
  }
}
