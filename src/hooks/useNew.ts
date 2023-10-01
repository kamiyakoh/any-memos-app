import type { FormValues } from '../types';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

interface UseNew {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  postMemo: (data: FormValues) => Promise<void>;
}

export const useNew = (): UseNew => {
  const { handle401 } = useLogin();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      category: '',
      description: '',
      date: '',
      isChecked: false,
    },
  });
  const postMemo = useCallback(
    async (data: FormValues): Promise<void> => {
      const { title, category, description, date, isChecked } = data;
      let markDiv = 0;
      if (isChecked) markDiv = 1;

      try {
        const res = await axiosInstance.post('/memo', {
          title,
          category,
          description,
          date,
          markDiv,
        });

        if (res.status === 200) {
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
    [reset, handle401],
  );

  return { register, handleSubmit, postMemo };
};
