import type { Memo } from '../types';
import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// import { authState } from '../states/authState';
import { memosState } from '../states/memosState';
import { axiosInstance } from '../utils/axiosInstance';

interface UseMemos {
  memos: Memo[];
  data?: Memo[];
  setNewMemos: (newMemos: Memo[]) => void;
  delMemo: (id: string) => void;
  // fetchMemos: () => void;
  fetchMemos: () => Promise<Memo[]>;
}

export const useMemos = (): UseMemos => {
  // const [auth, setAuth] = useRecoilState(authState);
  const [memos, setMemos] = useRecoilState(memosState);

  const setNewMemos = useCallback(
    (newMemos: Memo[]) => {
      setMemos(newMemos);
    },
    [setMemos],
  );
  const delMemo = useCallback(
    (id: string): void => {
      const thisTitle = memos.find((memo) => memo.id === id)?.title ?? '';
      const filterMemos = memos.filter((memo) => memo.id !== id);
      const fixedMemos = filterMemos.map((memo, index) => ({
        ...memo,
        id: index.toString(),
      }));
      setNewMemos(fixedMemos);
      toast(`ID: ${id}\nタイトル: ${thisTitle}\nのメモを削除しました`, { icon: '🚮' });
    },
    [memos, setNewMemos],
  );
  /* const fetchMemos = useCallback((): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          if (!auth.isAuth) setAuth({ isAuth: true });
          const memosData = (await response.json()) as Pick<UseMemos, 'memos'>;
          setNewMemos(memosData.memos);
        } else {
          toast.error((await response.json()) as string);
          if (auth.isAuth) setAuth({ isAuth: false });
        }
      })
      .catch((error: string) => {
        toast.error(`エラーが発生しました: ${error}`);
        if (auth.isAuth) setAuth({ isAuth: false });
      });
  }, [auth, memos, setAuth, setNewMemos]); */
  const fetchMemos = async (): Promise<Memo[]> => {
    const result = await axiosInstance.get<{ memos: Memo[] }>('/memos');
    return result.data.memos;
  };

  const { data } = useQuery<Memo[]>(['memos'], fetchMemos);

  return { memos, data, setNewMemos, delMemo, fetchMemos };
};
