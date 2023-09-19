import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useCallback } from 'react';
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
  const fetchIsAuth = useCallback((): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          if (!auth.isAuth) setAuth({ isAuth: true });
        } else {
          if (auth.isAuth) setAuth({ isAuth: false });
        }
      })
      .catch(() => {
        if (auth.isAuth) setAuth({ isAuth: false });
        toast.error('ログイン認証に失敗しました');
      });
  }, [auth, setAuth]);

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

  return { register, handleSubmit, fetchIsAuth, handleLogin };
};
