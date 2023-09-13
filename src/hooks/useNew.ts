import type { FormValues } from '../types';
import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UseNew {
  inputErrorMessage: string;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  postMemo: (data: FormValues) => Promise<void>;
}
interface ErrorMessage {
  errorMessage: string;
}

export const useNew = (): UseNew => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      category: '',
      description: '',
      date: '',
      isChecked: false,
    },
  });
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const postMemo = async (data: FormValues): Promise<void> => {
    const title = data.title;
    const category = data.category;
    const description = data.description;
    const date = data.date;
    let markDiv = 0;
    if (data.isChecked) markDiv = 1;

    try {
      const response = await fetch('/api/memo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, category, description, date, markDiv }),
      });

      if (response.ok) {
        setInputErrorMessage('');
        reset();
        toast.success('新しいメモを作成しました');
      } else {
        const responseError = (await response.json()) as ErrorMessage;
        setInputErrorMessage(responseError.errorMessage);
        toast.error(responseError.errorMessage);
      }
    } catch {
      toast.error('エラーが発生しました');
    }
  };

  return { inputErrorMessage, register, handleSubmit, postMemo };
};
