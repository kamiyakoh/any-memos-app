import type { QueryObserverResult } from '@tanstack/react-query';
import type { SortIdDate, PickDateDiff, PickMarkDiv, MemoData } from '../types';
import { useState, useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useLogin } from './useLogin';
import { categoriesState } from '../states/categories';
import { pickCategoriesState } from '../states/pickCategoriesState';
import { axiosInstance } from '../utils/axiosInstance';
import { queryKey } from '../utils/queryKey';
import { diffFromNowYD } from '../utils/date';
import { sortIdDateRadio, pickDateDiffRadio, pickMarkDivRadio } from '../utils/const';

interface UseMemos {
  sortIdDate: SortIdDate;
  pickDateDiff: PickDateDiff;
  pickMarkDiv: PickMarkDiv;
  memos?: MemoData[];
  showMemos?: MemoData[];
  categories: string[];
  fetchMemos: () => Promise<MemoData[]>;
  refetchMemos: () => Promise<QueryObserverResult<MemoData[], unknown>>;
  handleSortIdDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePickDiffChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMarkDivChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showMemosDel: () => void;
}

export const useMemos = (): UseMemos => {
  const [sortIdDate, setSortIdDate] = useState<SortIdDate>('idAsc');
  const [pickDateDiff, setPickDateDiff] = useState<PickDateDiff>('all');
  const [pickMarkDiv, setPickMarkDiv] = useState<PickMarkDiv>('-1');
  const [categories, setCategories] = useRecoilState<string[]>(categoriesState);
  const pickCategories = useRecoilValue(pickCategoriesState);
  const { handle401 } = useLogin();

  const fetchMemos = async (): Promise<MemoData[]> => {
    const result = await axiosInstance.get<{ memos: MemoData[] }>('/memos');
    const memos = result.data.memos ?? [];
    if (result.status === 200) {
      const memosCat = memos.map((memo) => memo.category).sort() ?? [];
      const uniqueCat = [...new Set(memosCat)];
      setCategories(uniqueCat);
    }
    return memos;
  };

  const queryMemos = useQuery<MemoData[]>([queryKey.memos], fetchMemos, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const memos = queryMemos.data;
  const refetchMemos = queryMemos.refetch;

  const sortMemos = useCallback((memos: MemoData[], sortIdDate: SortIdDate): MemoData[] => {
    return memos.sort((a, b) => {
      switch (sortIdDate) {
        case 'dateAsc':
          return dayjs(a.date).diff(b.date);
        case 'dateDesc':
          return dayjs(b.date).diff(a.date);
        case 'idDesc':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return parseInt(a.id) - parseInt(b.id);
      }
    });
  }, []);

  const handleSortIdDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedSort = sortIdDateRadio.find((sort) => sort.value === event.target.value) ?? {
      value: 'idAsc',
      label: 'ID小さい順',
    };
    if (selectedSort !== null) {
      setSortIdDate(selectedSort.value);
    }
  }, []);
  const handlePickDiffChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedPick = pickDateDiffRadio.find((sort) => sort.value === event.target.value) ?? {
      value: 'all',
      label: '全て',
    };
    if (selectedPick !== null) {
      setPickDateDiff(selectedPick.value);
    }
  }, []);
  const handleMarkDivChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedPick = pickMarkDivRadio.find((sort) => sort.value === event.target.value) ?? {
      value: '-1',
      label: '全て',
    };
    if (selectedPick !== null) {
      setPickMarkDiv(selectedPick.value);
    }
  }, []);
  const filterDateDiff = (date: string, pickDateDiff: PickDateDiff): boolean => {
    const { status } = diffFromNowYD(date);
    let result = true;
    switch (pickDateDiff) {
      case 'rest':
        if (status !== 'over') {
          result = true;
        } else {
          result = false;
        }
        break;
      case 'over':
        if (status === 'over') {
          result = true;
        } else {
          result = false;
        }
        break;
    }
    return result;
  };

  const pickMemos = useCallback(
    (
      sortIdDate: SortIdDate,
      pickDateDiff: PickDateDiff,
      pickMarkDiv: PickMarkDiv,
      pickCategories: string[],
    ): MemoData[] => {
      const pickedDateDiffMemos =
        pickDateDiff === 'all' ? memos : memos?.filter((memo) => filterDateDiff(memo.date, pickDateDiff));
      const pickedMarkDiv =
        pickMarkDiv === '-1'
          ? pickedDateDiffMemos
          : pickedDateDiffMemos?.filter((memo) => pickMarkDiv === memo.markDiv.toString());
      const pickedCat = pickedMarkDiv?.filter((memo) => pickCategories.includes(memo.category)) ?? [];
      return sortMemos(pickedCat ?? ([] as MemoData[]), sortIdDate) ?? ([] as MemoData[]);
    },
    [memos, sortMemos],
  );
  const showMemos = useMemo(() => {
    return pickMemos(sortIdDate, pickDateDiff, pickMarkDiv, pickCategories);
  }, [sortIdDate, pickDateDiff, pickMarkDiv, pickCategories, pickMemos]);
  const showMemosDel = useCallback(async () => {
    const delIds = showMemos.map((memo) => parseInt(memo.id, 10)).sort((a, b) => b - a);

    if (confirm(`表示中の${delIds.length}件のメモを本当にまとめて削除しますか？`)) {
      try {
        const res = await axiosInstance.get('/memos');

        if (res.status === 200) {
          let success = 0;
          let error = 0;

          const deleteMemo = async (id: number): Promise<void> => {
            try {
              const res = await axiosInstance.delete<MemoData | { errorMessage: string }>(`/memo/${id.toString()}`);
              if (res.status === 200) {
                success++;
              } else {
                error++;
              }
            } catch (err) {
              error++;
              console.error('Error deleting memo:', err);
            }
          };

          const deletePromises = delIds.map(deleteMemo);

          await Promise.all(deletePromises);

          toast(`${success > 0 ? success.toString() + '件のメモを削除しました\n' : ''}
            ${error > 0 ? error.toString() + '件のメモが削除できませんでした' : ''}`);

          await refetchMemos();
        }
        if (res.status === 401) {
          handle401();
        }
      } catch (err) {
        console.error('Error fetching memos:', err);
      }
    }
  }, [showMemos, handle401, refetchMemos]);

  return {
    sortIdDate,
    pickDateDiff,
    pickMarkDiv,
    memos,
    showMemos,
    categories,
    fetchMemos,
    refetchMemos,
    handleSortIdDateChange,
    handlePickDiffChange,
    handleMarkDivChange,
    showMemosDel,
  };
};
