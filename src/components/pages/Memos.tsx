import { FC } from 'react';
import { useMemos } from '../../hooks/useMemos';

export const Memos: FC = () => {
  const { data, delMemo } = useMemos();
  console.log(data);

  return (
    <div className="flex justify-center w-full px-[5%]">
      <div className="flex flex-wrap w-full max-w-[1920px] gap-4">
        {data?.map((memo) => (
          <div
            key={memo.id}
            className="bg-black bg-opacity-50 rounded p-4 w-full md:w-[calc(50%_-_0.5rem)]"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <h2>ID: {memo.id}</h2>
            <h2>タイトル: {memo.title}</h2>
            <p>カテゴリー: {memo.category}</p>
            <p>詳細説明: {memo.description}</p>
            <p>期限日時: {memo.date}</p>
            {memo.markDiv === 1 && <p>★</p>}
            <button
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              onClick={() => {
                delMemo(memo.id);
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
