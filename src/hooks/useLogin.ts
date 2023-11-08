import type { SetterOrUpdater } from 'recoil';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNewButton } from './useNewButton';
import { useEditButton } from './useEditButton';
import { isAuthState } from '../states/isAuthState';
import { login } from '../mocks/auth';

interface InputLogin {
  email: string;
  password: string;
}
interface UseLogin {
  isAuth: boolean;
  isLoading: boolean;
  setIsAuth: SetterOrUpdater<boolean>;
  register: UseFormRegister<InputLogin>;
  handleSubmit: UseFormHandleSubmit<InputLogin>;
  fetchIsAuth: () => void;
  handleLogin: (data: InputLogin) => void;
  handle401: () => void;
}

export const useLogin = (): UseLogin => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useRecoilState<boolean>(isAuthState);
  const { closeNew } = useNewButton();
  const { closeEdit } = useEditButton();
  const { register, handleSubmit } = useForm<InputLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // useEffectとaxiosとMSWの組合せで発生するFireFoxのXHR_404_NotFonund問題に対処するためaxiosではなくfetchを使用
  const fetchIsAuth = useCallback((): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) setIsAuth(true);
        if (res.status === 401) setIsAuth(false);
      })
      .catch(() => {
        setIsAuth(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsAuth]);

  const handleLogin = useCallback(
    (data: InputLogin): void => {
      const email = data.email;
      const password = data.password;
      login(email, password)
        .then((tokenData) => {
          localStorage.setItem('accessToken', tokenData.accessToken);
          localStorage.setItem('accessTokenExp', tokenData.accessTokenExp);
          setIsAuth(true);
        })
        .catch(() => {
          toast.error('メールアドレスまたは\nパスワードが違います');
        });
    },
    [setIsAuth],
  );

  const handle401 = useCallback((): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExp');
    closeNew();
    closeEdit();
    toast.error('権限がありません\n再ログインしてください');
    setIsAuth(false);
  }, [closeNew, closeEdit, setIsAuth]);

  return { isAuth, isLoading, setIsAuth, register, handleSubmit, fetchIsAuth, handleLogin, handle401 };
};
