import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import { getCookie, removeCookies, setCookies } from '@/hooks/useCookie';
import { AUTH_TOKEN } from '@/shared/constants/auth';

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
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NTYzNDM2MzQsImV4cCI6MTY1NzY4MjgzNH0.DPlMrFGJ2_Lv45-0o_INpqXJBq6nrsHNFRiw4-ZC2x3ndp_j8x7NY3GuIoQ0ZaV0VnCvaxmjfs1HXEMne3mS-A',
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

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError) => {
  const token = getCookie(AUTH_TOKEN);

  if (token && error.response?.status === 401) {
    removeCookies('authToken');
  }
};

axios.interceptors.response.use(onResponse, onResponseError);

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
