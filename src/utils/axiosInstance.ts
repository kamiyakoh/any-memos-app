import type { AxiosError } from 'axios';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExp');
    return error.response;
  },
);
