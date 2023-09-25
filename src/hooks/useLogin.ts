import type { SetterOrUpdater } from 'recoil';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import type { Auth } from '../states/authState';
import type { Memo } from '../types';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authState } from '../states/authState';
// import { useHandleModal } from './useHandleModal';
import { axiosInstance } from '../utils/axiosInstance';
import { login } from '../mocks/auth';
import { useQuery } from '@tanstack/react-query';

interface InputLogin {
  email: string;
  password: string;
}
interface UseLogin {
  auth: Auth;
  isOpenLogin?: boolean;
  setAuth: SetterOrUpdater<Auth>;
  register: UseFormRegister<InputLogin>;
  handleSubmit: UseFormHandleSubmit<InputLogin>;
  fetchIsAuth: () => void;
  handleLogin: (data: InputLogin) => void;
}

export const useLogin = (): UseLogin => {
  const [auth, setAuth] = useRecoilState(authState);

  const { register, handleSubmit } = useForm<InputLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const fetchIsOpenLogin = async (): Promise<boolean> => {
    let isOpenLogin = false;
    const res = await axiosInstance.get<{ memos: Memo[] }>('/memos');
    console.log(res);
    if (res.status === 200) isOpenLogin = false;
    if (res.status === 401) isOpenLogin = true;
    return isOpenLogin;
  };
  const isOpenLogin = useQuery<boolean>(['isOpenLogin'], fetchIsOpenLogin).data;

  const fetchIsAuth = (): void => {
    axiosInstance
      .get('/memos')
      .then((response) => {
        if (response.status === 200) setAuth({ isAuth: true });
        if (response.status === 401) setAuth({ isAuth: false });
      })
      .catch((error: string) => {
        console.log(`エラーが発生しました: ${error}`);
      });
  };

  const handleLogin = useCallback((data: InputLogin): void => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((tokenData) => {
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('accessTokenExp', tokenData.accessTokenExp);
        window.location.reload();
      })
      .catch(() => {
        toast.error('メールアドレスまたは\nパスワードが違います');
      });
  }, []);

  return { auth, isOpenLogin, setAuth, register, handleSubmit, fetchIsAuth, handleLogin };
};
