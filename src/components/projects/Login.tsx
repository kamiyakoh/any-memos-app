import { FC } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Button } from '../uiParts/Button';

export const Login: FC = () => {
  const { register, handleSubmit, handleLogin } = useLogin();

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="email">
          メールアドレス
          <br />
          <input type="email" className="my-2 rounded-sm border-gray-400 border-2 shadow-sm" {...register('email')} />
        </label>
        <br />
        <label htmlFor="password">
          パスワード
          <br />
          <input
            type="password"
            className="my-2 rounded-sm border-gray-400 border-2 shadow-sm"
            {...register('password')}
          />
        </label>
        <br />
        <Button className="mt-4 text-white bg-violet-500 hover:bg-violet-600" type="submit">
          ログイン
        </Button>
      </form>
    </div>
  );
};
