import type { MemoData } from '../types';
import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { memosState } from '../states/memosState';
import { axiosInstance } from '../utils/axiosInstance';
import { queryKey } from '../utils/queryKey';

interface UseMemos {
  memos: MemoData[];
  data?: MemoData[];
  setNewMemos: (newMemos: MemoData[]) => void;
  fetchMemos: () => Promise<MemoData[]>;
}

export const useMemos = (): UseMemos => {
  // const [auth, setAuth] = useRecoilState(authState);
  const [memos, setMemos] = useRecoilState(memosState);

  const setNewMemos = useCallback(
    (newMemos: MemoData[]) => {
      setMemos(newMemos);
    },
    [setMemos],
  );

  const fetchMemos = async (): Promise<MemoData[]> => {
    const result = await axiosInstance.get<{ memos: MemoData[] }>('/memos');
    return result.data.memos;
  };

  const { data } = useQuery<MemoData[]>([queryKey.memos], fetchMemos);

  return { memos, data, setNewMemos, fetchMemos };
};
