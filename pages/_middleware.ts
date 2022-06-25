import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { BASE_URL } from '@/shared/constants/url';
import { ROUTES } from '@/shared/constants/routes';

export function middleware(req: NextRequest) {
  if (!req.url.includes(`${BASE_URL}${ROUTES.LOGIN}`) && !req.url.includes('/share/post') && !req.cookies.authToken) {
    return NextResponse.redirect(`${BASE_URL}${ROUTES.LOGIN}`);
  }
}
