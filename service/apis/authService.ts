import axios from 'axios';
import fetcher from '@/shared/utils/fetcher';
import { setCookies } from '@/hooks/useCookie';
import { AUTH_TOKEN } from '@/shared/constants/auth';

const authService = {
  getKakaoAuth: async (kakaoCode: string) => {
    try {
      const { data } = await fetcher('get', '/signIn/kakao', {
        params: {
          code: kakaoCode,
        },
      });

      const { auth, refresh } = data;

      setCookies(AUTH_TOKEN, auth, { secure: true, sameSite: 'lax', maxAge: 31536000 }); //TODO: 이러면 refresh 토큰이 필요있나? maxAge가 1년이라.. 리팩토링 해야될듯

      return { auth, refresh };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },

  getAppleAuth: async (appleCode: string) => {
    try {
      const { data } = await fetcher('get', '/signIn/apple', {
        params: {
          code: appleCode,
        },
      });

      const { auth, refresh } = data;

      setCookies(AUTH_TOKEN, auth, { secure: true, sameSite: 'lax', maxAge: 31536000 }); //TODO: 이러면 refresh 토큰이 필요있나? maxAge가 1년이라.. 리팩토링 해야될듯

      return { auth, refresh };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },

  login: async (AUTH_TOKEN: string) => {
    const headers = { AUTH_TOKEN };
    const { data } = await axios.get('/users/me', { headers });

    return data;
  },

  getUsers: async () => {
    const { data } = await fetcher('get', '/users/me');

    return data;
  },
};

export default authService;
