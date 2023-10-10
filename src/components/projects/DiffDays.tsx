import { FC } from 'react';
import { diffFromNowYD } from '../../utils/date';
import dayjs from 'dayjs';

interface Props {
  date: string | null | undefined;
  isModal: boolean;
}

export const DiffDays: FC<Props> = ({ date, isModal }) => {
  const isvalidate = dayjs(date).isValid();
  if (!isvalidate) return null;

  if (date !== null && date !== undefined) {
    return new Map([
      [
        'rest',
        <span key="rest" className={isModal ? 'text-green-700' : 'text-green-400'}>
          [残り&nbsp;{diffFromNowYD(date).diff}]
        </span>,
      ],
      [
        'today',
        <span key="today" className={isModal ? 'text-blue-600' : 'text-blue-300'}>
          [今日]
        </span>,
      ],
      [
        'over',
        <span key="over" className={isModal ? 'text-red-700' : 'text-red-400'}>
          [超過&nbsp;{diffFromNowYD(date).diff}]
        </span>,
      ],
    ]).get(diffFromNowYD(date).status);
  }
};
