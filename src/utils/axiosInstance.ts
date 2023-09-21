import type { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { authState } from '../states/authState';

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      const setAuth = useSetRecoilState(authState);
      setAuth({ isAuth: false });
    }
  },
);
