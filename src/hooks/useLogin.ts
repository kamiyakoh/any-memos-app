import type { SetterOrUpdater } from 'recoil';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import type { Auth } from '../states/authState';
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authState } from '../states/authState';
import { login } from '../mocks/auth';

interface InputLogin {
  email: string;
  password: string;
}
interface UseLogin {
  auth: Auth;
  isLoading: boolean;
  setAuth: SetterOrUpdater<Auth>;
  register: UseFormRegister<InputLogin>;
  handleSubmit: UseFormHandleSubmit<InputLogin>;
  fetchAuth: () => void;
  handleLogin: (data: InputLogin) => void;
}

export const useLogin = (): UseLogin => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);
  const { register, handleSubmit } = useForm<InputLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // useEffectとaxiosとMSWの組合せで発生するFireFoxのXHR_404_NotFonund問題に対処するためaxiosではなくfetchを使用
  const fetchAuth = useCallback((): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) setAuth({ isAuth: true });
        if (res.status === 401) setAuth({ isAuth: false });
      })
      .catch(() => {
        setAuth({ isAuth: false });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setAuth]);

  const handleLogin = useCallback(
    (data: InputLogin): void => {
      const email = data.email;
      const password = data.password;
      login(email, password)
        .then((tokenData) => {
          localStorage.setItem('accessToken', tokenData.accessToken);
          localStorage.setItem('accessTokenExp', tokenData.accessTokenExp);
          setAuth({ isAuth: true });
        })
        .catch(() => {
          toast.error('メールアドレスまたは\nパスワードが違います');
        });
    },
    [setAuth],
  );

  return { auth, isLoading, setAuth, register, handleSubmit, fetchAuth, handleLogin };
};
