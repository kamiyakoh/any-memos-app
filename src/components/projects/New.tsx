import { FC } from 'react';
import { useNew } from '../../hooks/useNew';

export const New: FC = () => {
  const { inputErrorMessage, register, handleSubmit, postMemo } = useNew();

  return (
    <div>
      {inputErrorMessage !== '' && <p>{inputErrorMessage}</p>}
      <form className="w-[80vw] max-w-screen-2xl" onSubmit={handleSubmit(postMemo)}>
        <label htmlFor="title">
          タイトル
          <br />
          <input
            type="text"
            className="my-2 w-full rounded-sm border-gray-400 border-2 shadow-sm"
            {...register('title')}
          />
        </label>
        <br />
        <label htmlFor="category">
          カテゴリー
          <br />
          <input
            type="text"
            className="my-2 w-full rounded-sm border-gray-400 border-2 shadow-sm"
            {...register('category')}
          />
        </label>
        <br />
        <label htmlFor="description">
          説明
          <br />
          <textarea
            rows={5}
            className="my-2 w-full rounded-sm border-gray-400 border-2 shadow-sm"
            {...register('description')}
          ></textarea>
        </label>
        <br />
        <label htmlFor="date">
          期限日時
          <br />
          <input type="date" className="my-2 rounded-sm border-gray-400 border-2 shadow-sm" {...register('date')} />
        </label>
        <br />
        <label htmlFor="isChecked">
          マーク
          <br />
          <input type="checkbox" {...register('isChecked')} />
        </label>
        <br />
        <button type="submit" className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          作成
        </button>
      </form>
    </div>
  );
};
