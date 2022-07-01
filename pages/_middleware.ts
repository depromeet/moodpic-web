import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/shared/constants/routes';

export function middleware(req: NextRequest) {
  const baseUrl = new URL(req.url).origin;

  // reference: https://stackoverflow.com/questions/72206974/next-js-middleware-with-nextresponse-blocks-images-from-rendering
  const unprotectedPaths: string[] = [
    `${baseUrl}/login`,
    `${baseUrl}/_next/webpack-hmr`,
    `${baseUrl}/images/ANXIOUS_160x160.png`,
    `${baseUrl}/images/RELIEF_160x160.png`,
    `${baseUrl}/images/EASYGOING_160x160.png`,
    `${baseUrl}/images/PROUD_160x160.png`,
    `${baseUrl}/images/DISAPPOINTMENT_160x160.png`,
    `${baseUrl}/images/LETHARGY_160x160.png`,
    `${baseUrl}/images/SADNESS_160x160.png`,
    `${baseUrl}/images/REGRET_160x160.png`,
    `${baseUrl}/images/JOY_160x160.png`,
    `${baseUrl}/images/CALMDOWN_160x160.png`,
    `${baseUrl}/images/IRRITATION_160x160.png`,
  ];

  if (unprotectedPaths.includes(req.url)) {
    return void 0;
  } else if (
    !req.url.includes(`${baseUrl}${ROUTES.LOGIN}`) &&
    !req.url.includes(`${baseUrl}${ROUTES.AUTH_CALLBACK_KAKAO}`) &&
    !req.url.includes('/share/post') &&
    !req.cookies.authToken
  ) {
    return NextResponse.redirect(`${baseUrl}${ROUTES.LOGIN}`);
  }
}
