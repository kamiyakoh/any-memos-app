import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { login } from '../mocks/auth';

interface InputLogin {
  email: string;
  password: string;
}
interface UseLogin {
  isAuth: boolean;
  register: UseFormRegister<InputLogin>;
  handleSubmit: UseFormHandleSubmit<InputLogin>;
  fetchIsAuth: () => void;
  handleLogin: (data: InputLogin) => void;
}

export const useLogin = (): UseLogin => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<InputLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const fetchIsAuth = useCallback((): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!isAuth) setIsAuth(true);
        } else {
          if (isAuth) setIsAuth(false);
        }
      })
      .catch(() => {
        if (isAuth) setIsAuth(false);
        toast.error('ログイン認証に失敗しました');
      });
  }, [isAuth]);

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

  return { isAuth, register, handleSubmit, fetchIsAuth, handleLogin };
};
