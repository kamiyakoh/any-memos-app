import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import { useMemos } from './useMemos';
import { useCategory } from './useCategory';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

export interface FormValues {
  title: string;
  category: string;
  description: string;
  date: string;
  markDiv: string;
}
interface UseNew {
  watchDate: string;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  postMemo: (data: FormValues) => Promise<void>;
}

export const useNew = (): UseNew => {
  const { handle401 } = useLogin();
  const { refetchMemos } = useMemos();
  const { addPickCategories } = useCategory();
  const { register, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      category: '',
      description: '',
      date: '',
      markDiv: '0',
    },
  });
  const watchDate = watch('date', '');
  const postMemo = useCallback(
    async (data: FormValues): Promise<void> => {
      const { title, category, description, date, markDiv } = data;

      try {
        const res = await axiosInstance.post('/memo', {
          title,
          category,
          description,
          date,
          markDiv: parseInt(markDiv, 10),
        });

        if (res.status === 200) {
          await refetchMemos();
          addPickCategories(category);
          reset();
          toast.success('新しいメモを作成しました');
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
    [addPickCategories, reset, refetchMemos, handle401],
  );

  return { watchDate, register, handleSubmit, postMemo };
};
