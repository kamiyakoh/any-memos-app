import type { SetterOrUpdater } from 'recoil';
import type { MemoData } from '../types';
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useLogin } from './useLogin';
import { useMemos } from './useMemos';
import { currentIdOpenDelState } from '../states/openDelStatte';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

interface UseMemo {
  isOpenDel: boolean;
  currentIdOpenDel: string;
  setCurrentIdOpenDel: SetterOrUpdater<string>;
  openDel: (id: string) => void;
  closeDel: () => void;
  delMemo: (id: string) => void;
  textFormatBr: (text: string) => string;
}

export const useMemoSingle = (): UseMemo => {
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false);
  const { handle401 } = useLogin();
  const { refetchMemos } = useMemos();
  const [currentIdOpenDel, setCurrentIdOpenDel] = useRecoilState(currentIdOpenDelState);
  const openDel = useCallback(
    (id: string): void => {
      setIsOpenDel(true);
      setCurrentIdOpenDel(id);
    },
    [setCurrentIdOpenDel],
  );
  const closeDel = useCallback((): void => {
    setIsOpenDel(false);
  }, []);
  const delMemo = useCallback(
    (id: string): void => {
      axiosInstance
        .delete<MemoData | { errorMessage: string }>(`/memo/${id}`)
        .then(async (res) => {
          if (res.status === 200) {
            await refetchMemos();
            setCurrentIdOpenDel('');
            const { title, category } = res.data as MemoData;
            toast(`タイトル: ${title}\n${category !== '' ? 'カテゴリー:' + category + '\n' : ''}のメモを削除しました`, {
              icon: '🚮',
            });
          }
          if (res.status === 401) {
            handle401();
          }
          if (res.status === 400) {
            const responseError = res.data as { errorMessage: string };
            toast.error(responseError.errorMessage);
          }
        })
        .catch(() => {
          toast.error('メモの削除に失敗しました');
        });
    },
    [refetchMemos, setCurrentIdOpenDel, handle401],
  );
  const textFormatBr = useCallback((text: string): string => {
    if (text === '' || text === null) return '';
    const escText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return escText.replace(/\n/g, '<br>');
  }, []);

  return { isOpenDel, currentIdOpenDel, setCurrentIdOpenDel, openDel, closeDel, delMemo, textFormatBr };
};
