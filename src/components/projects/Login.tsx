import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../mocks/auth';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (): void => {
    login(email, password)
      .then((tokenData) => {
        const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('token', tokenData.token);
        localStorage.setItem('tokenExpiration', expirationDate.toString());
        console.log('Login successful!');
        navigate('/dashboard');
      })
      .catch(() => {
        console.error('Login failed');
      });
  };

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
