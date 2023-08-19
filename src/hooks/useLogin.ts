import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../mocks/auth';

interface UseLogin {
  loginErrorMessage: string;
  fetchIsAuth: () => void;
  handleLogin: (email: string, password: string) => void;
}

export const useLogin = (): UseLogin => {
  const navigate = useNavigate();
  const [loginErrorMessage, setloginErrorMessage] = useState('');

  const fetchIsAuth = (): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate('/dashboard');
        } else {
          console.log(response.json());
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  };

  const handleLogin = (email: string, password: string): void => {
    login(email, password)
      .then((tokenData) => {
        localStorage.setItem('accessToken', tokenData.accessToken);
        localStorage.setItem('accessTokenExp', tokenData.accessTokenExp);
        navigate('/dashboard');
      })
      .catch(() => {
        setloginErrorMessage('メールアドレスまたはパスワードが違います');
      });
  };

  return { loginErrorMessage, fetchIsAuth, handleLogin };
};
