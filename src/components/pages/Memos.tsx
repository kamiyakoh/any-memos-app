import { FC } from 'react';
import { useMemos } from '../../hooks/useMemos';

export const Memos: FC = () => {
  const { data, delMemo, textFormatBr } = useMemos();

  return (
    <div className="flex justify-center w-full px-[5%] pb-[5.5rem]">
      <div className="flex flex-wrap w-full max-w-[1920px] gap-4">
        {data?.map((memo) => (
          <div
            key={memo.id}
            className="flex flex-col justify-between break-words whitespace-pre-wrap bg-black bg-opacity-50 rounded p-4 w-full md:w-[calc(50%_-_0.5rem)]"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <div className="space-y-2">
              <div className="flex gap-x-2">
                <h2>ID： {memo.id}</h2>
              </div>
              <h2>タイトル： {memo.title}</h2>
              <p>カテゴリー： {memo.category}</p>
              <div className="flex flex-wrap gap-x-2">
                <p>詳細説明：</p>
                <div className="w-full" dangerouslySetInnerHTML={{ __html: textFormatBr(memo.description) }} />
              </div>
              <p>期限日時： {memo.date}</p>
              {memo.markDiv === 1 && (
                <span className="block text-4xl font-extrabold" style={{ lineHeight: 1 }}>
                  ★
                </span>
              )}
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  delMemo(memo.id);
                }}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
