// Login.tsx
import { FC, useState } from 'react';
import { login } from '../../mocks/auth';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const tokenData = await login(email, password);

      // ログインに成功した場合、24時間有効なJWTトークンをlocalStorageに保存
      const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('token', tokenData.token);
      localStorage.setItem('tokenExpiration', expirationDate.toString());

      // この部分でダッシュボードなどにリダイレクトする処理を追加することができる
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
