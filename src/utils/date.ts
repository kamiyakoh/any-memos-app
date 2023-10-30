import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

interface DiffFromNowYD {
  diff: string;
  status: 'rest' | 'today' | 'over';
}

export const diffFromNowYD = (date: string | number | Date | dayjs.Dayjs): DiffFromNowYD => {
  const now = dayjs().startOf('day');
  const diff = dayjs(date).diff(now, 'day');
  let result = { diff: '', status: 'rest' as 'rest' | 'today' | 'over' };

  if (diff > 365) {
    result = { diff: `${Math.floor(diff / 365)}年 ${diff % 365}日`, status: 'rest' };
  }
  if (diff > 0 && diff <= 365) {
    result = { diff: `${diff}日`, status: 'rest' };
  }
  if (diff === 0) {
    result = { diff: '', status: 'today' };
  }
  if (diff < 0 && diff >= -365) {
    result = { diff: `${diff * -1}日`, status: 'over' };
  }
  if (diff < -365) {
    result = { diff: `${Math.floor(diff / 365) * -1}年 ${(diff % 365) * -1}日`, status: 'over' };
  }

  return result;
};

export const jaDay = (
  date?: string | number | Date | dayjs.Dayjs | null,
  format?: dayjs.OptionType,
  strict?: boolean,
): dayjs.Dayjs => {
  dayjs.locale(ja);
  return dayjs(date, format, strict);
};

export const weekDayJa = (
  weekDayFormat: 'd' | 'dd' | 'ddd' | 'dddd',
  date?: string | number | Date | dayjs.Dayjs | null,
  format?: dayjs.OptionType,
  strict?: boolean,
): { color: string; weekDayString: string } => {
  dayjs.locale(ja);
  const weekDayString = dayjs(date, format, strict).format(weekDayFormat).toString();
  const weekDayNum = dayjs(date, format, strict).day();

  let color = 'text-white';
  if (weekDayNum === 0) color = 'red';
  if (weekDayNum === 6) color = 'blue';
  return { color, weekDayString };
};
