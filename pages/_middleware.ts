import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/shared/constants/routes';

export function middleware(req: NextRequest) {
  const baseUrl = new URL(req.url).origin;
  if (!req.url.includes(`${baseUrl}${ROUTES.LOGIN}`) && !req.url.includes('/share/post') && !req.cookies.authToken) {
    return NextResponse.redirect(`${baseUrl}${ROUTES.LOGIN}`);
  }
}
