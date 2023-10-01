import type { QueryObserverResult } from '@tanstack/react-query';
import type { MemoData } from '../types';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosInstance';
import { queryKey } from '../utils/queryKey';

interface UseMemos {
  memos?: MemoData[];
  fetchMemos: () => Promise<MemoData[]>;
  refetchMemos: () => Promise<QueryObserverResult<MemoData[], unknown>>;
}

export const useMemos = (): UseMemos => {
  const fetchMemos = async (): Promise<MemoData[]> => {
    const result = await axiosInstance.get<{ memos: MemoData[] }>('/memos');
    return result.data.memos;
  };

  const queryMemos = useQuery<MemoData[]>([queryKey.memos], fetchMemos);
  const memos = queryMemos.data;
  const refetchMemos = queryMemos.refetch;

  return { memos, fetchMemos, refetchMemos };
};
