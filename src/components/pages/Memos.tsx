import { FC } from 'react';
import { Memo } from '../projects/Memo';
import { useMemos } from '../../hooks/useMemos';

export const Memos: FC = () => {
  const { data } = useMemos();

  return (
    <div className="flex justify-center w-full px-[5%] pb-[5.5rem]">
      <div className="flex flex-wrap w-full max-w-[1920px] gap-4">
        {data?.map((memo) => <Memo key={memo.id} memo={memo} />)}
      </div>
    </div>
  );
};
