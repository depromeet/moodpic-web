import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '@/shared/constants/url';

export function middleware(req: NextRequest) {
  if (!req.url.includes(`${BASE_URL}/oauth`) && !req.url.includes('/share/post') && !req.cookies.authToken) {
    return NextResponse.redirect(`${BASE_URL}/oauth`);
  }
}
