import axios, { AxiosError } from 'axios';
import {
  getLocalStorageValue,
  removeLocalStorageValue,
} from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorageKey';

// TODO: 이후 production baseURL 수정
const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  // const authToken = getLocalStorageValue(LOCAL_STORAGE_KEY.AUTH_TOKEN);
  // // auth관련 작업
  // return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // removeLocalStorageValue(LOCAL_STORAGE_KEY.AUTH_TOKEN);
    // push(ROUTES.LOGIN);
  },
);

export const apiClient = axiosInstance;
