import type { MemoData } from '../types';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLogin } from './useLogin';
import { useMemos } from './useMemos';
import { useCategory } from './useCategory';
import { axiosInstance } from '../utils/axiosInstance';

interface EditFormValues {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  markDiv: string;
}
interface UseEdit {
  watchDate: string;
  register: UseFormRegister<EditFormValues>;
  handleSubmit: UseFormHandleSubmit<EditFormValues>;
  editMemo: (data: EditFormValues) => Promise<void>;
}

export const useEdit = (memo: MemoData, closeModal: () => void): UseEdit => {
  const { handle401 } = useLogin();
  const { refetchMemos } = useMemos();
  const { addPickCategories } = useCategory();
  const { register, handleSubmit, watch, reset } = useForm<EditFormValues>({
    defaultValues: {
      id: memo.id,
      title: memo.title,
      category: memo.category,
      description: memo.description,
      date: memo.date,
      markDiv: memo.markDiv.toString(),
    },
  });
  const watchDate = watch('date');
  const editMemo = useCallback(
    async (data: EditFormValues): Promise<void> => {
      const { id, title, category, description, date, markDiv } = data;

      try {
        const res = await axiosInstance.put(`/memo/${id}`, {
          id,
          title,
          category,
          description,
          date,
          markDiv: parseInt(markDiv, 10),
        });

        if (res.status === 200) {
          const prevTitle = memo.title;
          const prevCat = memo.category;
          await refetchMemos();
          addPickCategories(category);
          reset();
          toast.success(
            `ID：${id}\n
            タイトル：${prevTitle !== title ? prevTitle + ' ⇒ ' : ''}${title}\n
            カテゴリー：${prevCat !== category ? prevCat + ' ⇒ ' : ''}${category}\n
            のメモを編集しました`,
          );
          closeModal();
        }
        if (res.status === 401) {
          handle401();
        }
        if (res.status === 400) {
          const responseError = res.data as { errorMessage: string };
          toast.error(responseError.errorMessage);
        }
      } catch (error) {
        toast.error('エラーが発生しました');
      }
    },
    [memo, addPickCategories, reset, refetchMemos, closeModal, handle401],
  );

  return { watchDate, register, handleSubmit, editMemo };
};
