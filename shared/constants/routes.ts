// TODO: 이후 type safe router 를 만들기 위해 다른 route도 추가가 되어야합니다.
export const ROUTES = {
  HOME: '/',
  AUTH_CALLBACK_KAKAO: '/oauth/callback/kakao',
  LOGIN: '/oauth',
} as const;
