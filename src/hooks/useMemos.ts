import type { Memo } from '../types';
import { useRecoilState } from 'recoil';
import { useEffect, useCallback } from 'react';
import { memosState } from '../states/memosState';

interface UseMemos {
  memos: Memo[];
  setNewMemos: (newMemos: Memo[]) => void;
  delMemo: (id: string) => void;
  fetchMemos: () => void;
}

export const useMemos = (): UseMemos => {
  const [memos, setMemos] = useRecoilState(memosState);
  useEffect(() => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const memosData = (await response.json()) as Pick<UseMemos, 'memos'>;
          setMemos(memosData.memos);
        } else {
          console.log(response.json());
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  }, [memos, setMemos]);
  const setNewMemos = useCallback(
    (newMemos: Memo[]) => {
      setMemos(newMemos);
    },
    [setMemos],
  );
  const delMemo = useCallback(
    (id: string) => {
      const filterMemos = memos.filter((memo) => memo.id !== id);
      const fixedMemos = filterMemos.map((memo, index) => ({
        ...memo,
        id: index.toString(),
      }));
      setNewMemos(fixedMemos);
    },
    [memos, setNewMemos],
  );
  const fetchMemos = (): void => {
    fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const memosData = (await response.json()) as Pick<UseMemos, 'memos'>;
          setNewMemos(memosData.memos);
        } else {
          console.log(response.json());
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  };

  return { memos, setNewMemos, delMemo, fetchMemos };
};
