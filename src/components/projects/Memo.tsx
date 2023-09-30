import type { MemoData } from '../../types';
import { FC, useEffect } from 'react';
import { useMemoSinle } from '../../hooks/useMemoSingle';
import { Button } from '../uiParts/Button';

interface Props {
  memo: MemoData;
}

export const Memo: FC<Props> = ({ memo }) => {
  const { isOpenDel, currentIdOpenDel, openDel, closeDel, delMemo, textFormatBr } = useMemoSinle();

  useEffect(() => {
    if (currentIdOpenDel !== memo.id) {
      closeDel();
    }
  }, [currentIdOpenDel, memo, closeDel]);

  return (
    <div
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
        {isOpenDel ? (
          <div className="flex gap-x-4">
            <Button
              type="button"
              className="bg-red-700 hover:bg-red-800"
              onClick={() => {
                delMemo(memo.id);
              }}
            >
              本当に削除
            </Button>
            <Button type="button" className="bg-gray-500 hover:bg-gray-600" onClick={closeDel}>
              キャンセル
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              openDel(memo.id);
            }}
          >
            削除
          </Button>
        )}
      </div>
    </div>
  );
};
