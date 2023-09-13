import { FC } from 'react';
import { useLogin } from '../../hooks/useLogin';

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
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
          ログイン
        </button>
      </form>
    </div>
  );
};
