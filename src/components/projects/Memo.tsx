import type { MemoData } from '../../types';
import { FC } from 'react';
import { useMemoSingle } from '../../hooks/useMemoSingle';
import { jaDay } from '../../utils/date';
import { Button } from '../uiParts/Button';
import { FrostedGlass } from '../uiParts/FrostedGlass';
import { DiffDays } from '../uiParts/DiffDays';
import { WeekDayJa } from '../uiParts/WeekDayJa';
import { EditButton } from '../uiParts/EditButton';

interface Props {
  memo: MemoData;
}

export const Memo: FC<Props> = ({ memo }) => {
  const { currentIdOpenDel, openDel, closeDel, delMemo, textFormatBr } = useMemoSingle();

  return (
    <FrostedGlass
      className={'flex flex-col justify-between break-words whitespace-pre-wrap w-full md:w-[calc(50%_-_0.5rem)]'}
    >
      <div className="space-y-2">
        <div className="flex gap-x-2">
          <h2>ID： {memo.id}</h2>
        </div>
        <h2>タイトル： {memo.title}</h2>
        <p>カテゴリー： {memo.category}</p>
        <div className="flex flex-wrap gap-x-2">
          <p>詳細説明：</p>
          <div className="max-w-full" dangerouslySetInnerHTML={{ __html: textFormatBr(memo.description) }} />
        </div>
        <p>
          期限日時： {jaDay(memo.date).format('YYYY/MM/DD')}&nbsp;
          <WeekDayJa date={memo.date} isModal={false} />
          &nbsp;
          <DiffDays date={memo.date} isModal={false} />
        </p>
        {memo.markDiv === 1 && (
          <span className="block text-4xl font-extrabold" style={{ lineHeight: 1 }}>
            ★
          </span>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <EditButton memo={memo} />
        <div>
          {currentIdOpenDel === memo.id ? (
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
    </FrostedGlass>
  );
};
