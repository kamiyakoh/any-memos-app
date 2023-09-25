import { FC } from 'react';

interface Props {
  isOpen: boolean;
  isLogin: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, isLogin, onClose, children }) => {
  if (!isOpen) return null;

  const handleBgClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isLogin && onClose !== undefined && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleBgClick}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white p-8 rounded-lg z-10 overflow-y-auto max-h-[90%]">
        {!isLogin && (
          <div className="absolute top-2 right-2">
            <button
              className="block w-8 h-8 before:absolute before:top-[50%] before:left-[50%] before:w-1 before:h-7 before:rounded-full before:bg-black before:translate-x-[-50%] before:translate-y-[-50%] before:rotate-45 after:absolute after:top-[50%] after:left-[50%] after:w-1 after:h-7 after:rounded-full after:bg-black after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-[-45deg]"
              onClick={onClose}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
