import { useState } from 'react';

interface UseHandleModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
};
