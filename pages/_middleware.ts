import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const [, , baseUrl] = req.url.split('/');
  if (!req.url.includes(`${baseUrl}/oauth`) && !req.url.includes('/share/post') && !req.cookies.authToken) {
    console.log('미들웨어 발생!');
    return NextResponse.redirect(`${baseUrl}/oauth`);
  }
}
