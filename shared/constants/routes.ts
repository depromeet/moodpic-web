import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URL } from './auth';

export const ROUTES = {
  HOME: '/',
  AUTH_CALLBACK_KAKAO: '/oauth/callback/kakao',
  LOGIN: '/oauth',
  KAKAO_AUTH: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`,
} as const;
