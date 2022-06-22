import axios from 'axios';
import qs from 'qs';
import { getCookie, setCookies } from '@/hooks/useCookie';
import { AUTH_TOKEN } from '../constants/auth';

axios.defaults.paramsSerializer = (params: object) => {
  return qs.stringify(params);
};

axios.defaults.baseURL = 'https://api.moodpic.kr';

axios.interceptors.request.use((config) => {
  const token = getCookie(AUTH_TOKEN);

  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      setCookies(
        AUTH_TOKEN,
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NTQ5NDU0MDEsImV4cCI6MTY1NjI4NDYwMX0.lYhaOcdF5MYXhOOmy9BuFiun0-ruVqlyLICJwDEMRY-tJd_u1p2XwszSI6QovucR1HeyWMQzzDPzH7tGVXPipg', // 자기 토큰으로 바꿔주세용
        { secure: true, sameSite: 'lax', maxAge: 31536000 },
      );
    }
    return config;
  }

  config.headers = {
    AUTH_TOKEN: token,
  };

  return config;
});

const fetcher = async (method: 'get' | 'post' | 'patch' | 'delete', url: string, ...rest: object[]) => {
  try {
    const { data } = await axios[method](url, ...rest);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('different error than axios');
  }
};

export default fetcher;
