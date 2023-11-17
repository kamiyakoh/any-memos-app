import type { MemoData } from '../../types';
import { FC, useState } from 'react';
import { useMemoSingle } from '../../hooks/useMemoSingle';
import { jaDay } from '../../utils/date';
import { Button } from '../uiParts/Button';
import { FrostedGlass } from '../uiParts/FrostedGlass';
import { DiffDays } from './DiffDays';
import { WeekDayJa } from '../uiParts/WeekDayJa';
import { Modal } from '../uiParts/Modal';
import { Edit } from './Edit';

interface Props {
  memo: MemoData;
  currentIdOpenDel: string;
  setCurrentIdOpenDel: React.Dispatch<React.SetStateAction<string>>;
}

export const Memo: FC<Props> = ({ memo, currentIdOpenDel, setCurrentIdOpenDel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { openDel, closeDel, delMemo, textFormatBr } = useMemoSingle(currentIdOpenDel, setCurrentIdOpenDel);

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
        {isOpen ? (
          <div />
        ) : (
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            編集
          </Button>
        )}
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
      <Modal
        addClassPanel="border-green-600 w-full"
        isOpen={isOpen}
        enableCloseButton
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Edit
          memo={memo}
          closeModal={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </FrostedGlass>
  );
};
