import type { ModalName, MemoData } from '../types';
import { useState } from 'react';

interface UseModal {
  selectedModal: ModalName;
  selectedMemo: MemoData;
  openModal: (modal: ModalName, memo?: MemoData) => void;
  closeModal: () => void;
}

export const useModal = (): UseModal => {
  const [selectedModal, setSelectedModal] = useState<ModalName>('');
  const [selectedMemo, setSelectedMemo] = useState<MemoData>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    markDiv: 0,
  });

  const openModal = (modal: ModalName, memo?: MemoData): void => {
    setSelectedModal(modal);
    if (memo !== undefined) setSelectedMemo(memo);
  };
  const closeModal = (): void => {
    setSelectedModal('');
  };

  return { selectedModal, selectedMemo, openModal, closeModal };
};
