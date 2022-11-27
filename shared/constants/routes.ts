const MYPAGE = '/mypage';
const WRITE = '/write';

// TODO: 이후 type safe router 를 만들기 위해 다른 route도 추가가 되어야합니다.
export const ROUTES = {
  HOME: '/',
  AUTH_CALLBACK_KAKAO: '/oauth/callback/kakao',
  AUTH_CALLBACK_APPLE: '/oauth/callback/apple',
  LOGIN: '/login',
  READY: '/ready',
  WRITE: WRITE,
  DIARY: `${WRITE}/diary`,
  WORRY: `${WRITE}/worry`,
  MYPAGE: MYPAGE,
  MYPOSTS: `${MYPAGE}/posts`,
  NOTICE: `${MYPAGE}/notice`,
  WITHDRAW: `${MYPAGE}/withdraw`,
} as const;
