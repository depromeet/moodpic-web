import axios from 'axios';
import fetcher from '../../shared/utils/fetcher';
import { setLocalStorageValue } from '../../shared/utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../../shared/constants/localStorageKey';

const authService = {
  getAuth: async (kakaoCode: string) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  },

  login: async (AUTH_TOKEN: string) => {
    try {
      const headers = { AUTH_TOKEN };
      const data = await axios.get('/users/me', { headers });

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  getUsers: async () => {
    const {
      data: { data },
    } = await fetcher('get', '/users/me');

    return data;
  },
};

export default authService;
