import axios from 'axios';
import fetcher from '../../shared/utils/fetcher';
import { setCookies } from '@/hooks/useCookie';

const authService = {
  getAuth: async (kakaoCode: string) => {
    const { data } = await fetcher('get', '/signIn', {
      params: {
        code: kakaoCode,
      },
    });

    const { auth, refresh } = data;

    setCookies('authToken', auth, { secure: true, sameSite: 'lax', maxAge: 31536000 }); //TODO: 이러면 refresh 토큰이 필요있나? maxAge가 1년이라.. 리팩토링 해야될듯

    return { auth, refresh };
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
