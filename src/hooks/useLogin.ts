import type { SetterOrUpdater } from 'recoil';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import type { Auth } from '../states/authState';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authState } from '../states/authState';
import { axiosInstance } from '../utils/axiosInstance';
import { login } from '../mocks/auth';

interface InputLogin {
  email: string;
  password: string;
}
interface UseLogin {
  auth: Auth;
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
  const fetchIsAuth = (): void => {
    axiosInstance
      .get('/memos')
      .then(() => {
        setAuth({ isAuth: true });
      })
      .catch(() => {
        console.log('ログイン認証に失敗しました');
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

  return { auth, setAuth, register, handleSubmit, fetchIsAuth, handleLogin };
};
