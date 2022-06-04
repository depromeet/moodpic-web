import axios from 'axios';
import { getLocalStorageValue } from './localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorageKey';
import qs from 'qs';

axios.defaults.paramsSerializer = (params: object) => {
  return qs.stringify(params);
};

// TODO: 어떻게 관리할지 고민 필요
axios.defaults.baseURL = 'https://api.moodpic.kr';
// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'development' ? 'http://3.35.50.139' : '';

axios.interceptors.request.use((config) => {
  const token = getLocalStorageValue(LOCAL_STORAGE_KEY.AUTH_TOKEN);

  if (!token) return config;

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
