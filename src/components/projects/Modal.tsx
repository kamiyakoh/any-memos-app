import { FC } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBgClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleBgClick}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white p-8 rounded-lg z-10 overflow-auto max-h-[90%]">
        {children}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
