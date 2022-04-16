import axios from 'axios';

// TODO: 이후 production baseURL 수정
const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const axiosInstance = axios.create({
  baseURL,
});

export const apiClient = axiosInstance;
