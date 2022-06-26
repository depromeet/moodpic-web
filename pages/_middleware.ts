import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '@/shared/constants/url';

export function middleware(req: NextRequest) {
  const { origin } = new URL(req.url);
  if (!req.url.includes(`${origin}/oauth`) && !req.url.includes('/share/post') && !req.cookies.authToken) {
    return NextResponse.redirect(`${origin}/oauth`);
  }
}
