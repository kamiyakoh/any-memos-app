import type { QueryObserverResult } from '@tanstack/react-query';
import type { MemoData } from '../types';
import { useState, useMemo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
// import { useCategory } from './useCategory';
import { categoriesState } from '../states/categories';
import { axiosInstance } from '../utils/axiosInstance';
import { queryKey } from '../utils/queryKey';
import { diffFromNowYD } from '../utils/date';
import dayjs from 'dayjs';

type SortIdDate = 'idAsc' | 'idDesc' | 'dateAsc' | 'dateDesc';
type PickDateDiff = 'all' | 'rest' | 'over';
type PickMarkDiv = '-1' | '0' | '1';
interface SortIdDateRadio {
  value: SortIdDate;
  label: string;
}
interface PickDateDiffRadio {
  value: PickDateDiff;
  label: string;
}
interface PickMarkDivRadio {
  value: PickMarkDiv;
  label: string;
}
interface UseMemos {
  sortIdDate: SortIdDate;
  pickDateDiff: PickDateDiff;
  pickMarkDiv: PickMarkDiv;
  sortIdDateRadio: SortIdDateRadio[];
  pickDateDiffRadio: PickDateDiffRadio[];
  pickMarkDivRadio: PickMarkDivRadio[];
  memos?: MemoData[];
  showMemos?: MemoData[];
  categories: string[];
  fetchMemos: () => Promise<MemoData[]>;
  refetchMemos: () => Promise<QueryObserverResult<MemoData[], unknown>>;
  handleSortIdDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePickDiffChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMarkDivChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pickMemos: (
    sortIdDate: SortIdDate,
    pickDateDiff: PickDateDiff,
    pickMarkDiv: PickMarkDiv,
    categories: string[],
  ) => void;
}

export const useMemos = (): UseMemos => {
  const [sortIdDate, setSortIdDate] = useState<SortIdDate>('idAsc');
  const [pickDateDiff, setPickDateDiff] = useState<PickDateDiff>('all');
  const [pickMarkDiv, setPickMarkDiv] = useState<PickMarkDiv>('-1');
  const [showMemos, setShowMemos] = useState<MemoData[]>([]);
  const [categories, setCategories] = useRecoilState<string[]>(categoriesState);
  // const { pickCategories } = useCategory();

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
  const sortIdDateRadio: SortIdDateRadio[] = useMemo(
    () => [
      { value: 'idAsc', label: 'ID小さい順' },
      { value: 'idDesc', label: 'ID大きい順' },
      { value: 'dateAsc', label: '期限日時古い順' },
      { value: 'dateDesc', label: '期限日時新しい順' },
    ],
    [],
  );
  const handleSortIdDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const selectedSort = sortIdDateRadio.find((sort) => sort.value === event.target.value) ?? {
        value: 'idAsc',
        label: 'ID小さい順',
      };
      if (selectedSort !== null) {
        setSortIdDate(selectedSort.value);
        setShowMemos(sortMemos(memos ?? ([] as MemoData[]), selectedSort.value));
      }
    },
    [memos, sortIdDateRadio, sortMemos],
  );

  const pickDateDiffRadio: PickDateDiffRadio[] = useMemo(
    () => [
      { value: 'all', label: '全て' },
      { value: 'rest', label: '残りあり' },
      { value: 'over', label: '超過' },
    ],
    [],
  );
  const handlePickDiffChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const selectedPick = pickDateDiffRadio.find((sort) => sort.value === event.target.value) ?? {
        value: 'all',
        label: '全て',
      };
      if (selectedPick !== null) {
        setPickDateDiff(selectedPick.value);
      }
    },
    [pickDateDiffRadio],
  );

  const pickMarkDivRadio: PickMarkDivRadio[] = useMemo(
    () => [
      { value: '-1', label: '全て' },
      { value: '1', label: '★あり' },
      { value: '0', label: '-なし' },
    ],
    [],
  );
  const handleMarkDivChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const selectedPick = pickMarkDivRadio.find((sort) => sort.value === event.target.value) ?? {
        value: '-1',
        label: '全て',
      };
      if (selectedPick !== null) {
        setPickMarkDiv(selectedPick.value);
      }
    },
    [pickMarkDivRadio],
  );

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
    (sortIdDate: SortIdDate, pickDateDiff: PickDateDiff, pickMarkDiv: PickMarkDiv, pickCategories: string[]): void => {
      const pickedDateDiffMemos =
        pickDateDiff === 'all' ? memos : memos?.filter((memo) => filterDateDiff(memo.date, pickDateDiff));
      const pickedMarkDiv =
        pickMarkDiv === '-1'
          ? pickedDateDiffMemos
          : pickedDateDiffMemos?.filter((memo) => pickMarkDiv === memo.markDiv.toString());
      const pickedCat = pickedMarkDiv?.filter((memo) => pickCategories.includes(memo.category)) ?? [];
      const sortedMemos = sortMemos(pickedCat ?? ([] as MemoData[]), sortIdDate) ?? ([] as MemoData[]);
      setShowMemos(sortedMemos);
    },
    [memos, sortMemos],
  );

  return {
    sortIdDate,
    pickDateDiff,
    pickMarkDiv,
    sortIdDateRadio,
    pickDateDiffRadio,
    pickMarkDivRadio,
    memos,
    showMemos,
    categories,
    fetchMemos,
    refetchMemos,
    handleSortIdDateChange,
    handlePickDiffChange,
    handleMarkDivChange,
    pickMemos,
  };
};
