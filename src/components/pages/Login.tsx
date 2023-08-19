import { FC, useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';

export const Login: FC = () => {
  const { loginErrorMessage, fetchIsAuth, handleLogin } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchIsAuth();
  }, [fetchIsAuth]);

  return (
    <div>
      <p>{loginErrorMessage}</p>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleLogin(email, password);
        }}
      >
        Login
      </button>
    </div>
  );
};
