import { FC } from 'react';
import { useNew } from '../../hooks/useNew';
import { Button } from '../uiParts/Button';
import { DiffDays } from './DiffDays';
import { WeekDayJa } from '../uiParts/WeekDayJa';

export const New: FC = () => {
  const { watchDate, register, handleSubmit, postMemo } = useNew();

  return (
    <div>
      <form onSubmit={handleSubmit(postMemo)}>
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
          &nbsp;&nbsp;
          <WeekDayJa date={watchDate} isModal={true} />
          &nbsp;&nbsp;
          <DiffDays date={watchDate} isModal={true} />
        </label>
        <br />
        <label>
          マークを
          <br />
        </label>
        <label>
          <input type="radio" value={1} className="mr-2" {...register('markDiv')} />
          ★（つける）
          <br />
        </label>
        <label>
          <input type="radio" value={0} defaultChecked className="mr-2" {...register('markDiv')} />
          -（つけない）
        </label>
        <br />
        <Button type="submit" className="mt-4 text-white bg-blue-500 hover:bg-blue-600">
          作成
        </Button>
      </form>
    </div>
  );
};
