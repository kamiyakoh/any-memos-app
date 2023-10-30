import { FC } from 'react';
import dayjs from 'dayjs';
import { weekDayJa } from '../../utils/date';

interface Props {
  date?: string | number | Date | dayjs.Dayjs | null;
  isModal: boolean;
  className?: string;
}

export const WeekDayJa: FC<Props> = ({ date, isModal, className }) => {
  const weekDay = weekDayJa('dd', date);
  let color = 'text-white';
  if (isModal) {
    color = 'text-black';
    if (weekDay.color === 'blue') color = 'text-blue-600';
    if (weekDay.color === 'red') color = 'text-red-700';
  } else {
    if (weekDay.color === 'blue') color = 'text-blue-300';
    if (weekDay.color === 'red') color = 'text-red-400';
  }

  if (!dayjs(date).isValid()) return null;
  return <span className={`${color} ${className ?? ''}`}>({weekDay.weekDayString})</span>;
};
