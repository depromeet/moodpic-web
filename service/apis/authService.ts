import axios from 'axios';
import fetcher from '../../shared/utils/fetcher';
import { setLocalStorageValue } from '../../shared/utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../../shared/constants/localStorageKey';

const authService = {
  getAuth: async (kakaoCode: string) => {
    const {
      data: { data },
    } = await fetcher('get', '/signIn', {
      params: {
        code: kakaoCode,
      },
    });

    const { auth, refresh } = data;

    setLocalStorageValue(LOCAL_STORAGE_KEY.AUTH_TOKEN, auth);

    return { auth, refresh };
  },

  login: async (AUTH_TOKEN: string) => {
    const headers = { AUTH_TOKEN };
    const {
      data: { data },
    } = await axios.get('/users/me', { headers });

    return data;
  },

  getUsers: async () => {
    const {
      data: { data },
    } = await fetcher('get', '/users/me');

    return data;
  },
};

export default authService;
