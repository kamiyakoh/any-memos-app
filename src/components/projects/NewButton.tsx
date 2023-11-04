import { FC } from 'react';
import { useNewButton } from '../../hooks/useNewButton';
import { Modal } from '../uiParts/Modal';
import { New } from './New';

export const NewButton: FC = () => {
  const { isOpenNew, openNew, closeNew } = useNewButton();

  return (
    <div>
      {!isOpenNew && (
        <button
          className={`fixed top-4 left-4 z-50 text-4xl px-4 h-16 bg-blue-500 text-white rounded hover:bg-blue-600 min-[1936px]:left-[calc((100%_-_1920px)_/_2)]`}
          onClick={openNew}
        >
          作成
        </button>
      )}
      {isOpenNew && (
        <Modal isOpen={isOpenNew} isLogin={false} borderColorClass="border-blue-500" onClose={closeNew}>
          <New />
        </Modal>
      )}
    </div>
  );
};
