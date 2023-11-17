import { FC } from 'react';
import { Dialog } from '@headlessui/react';

interface Props {
  addClassPanel: string;
  isOpen: boolean;
  enableCloseButton: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({ addClassPanel, isOpen, enableCloseButton, onClose, children }) => {
  // if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel
            className={`relative max-w-[90%] mx-auto my-[5vh] rounded-lg bg-white p-8 border-4 border-solid 2xl:max-w-screen-2xl ${addClassPanel}`}
          >
            {children}
            {enableCloseButton && (
              <div className="absolute top-2 right-2">
                <button
                  className="block w-8 h-8 before:absolute before:top-[50%] before:left-[50%] before:w-1 before:h-7 before:rounded-full before:bg-black before:translate-x-[-50%] before:translate-y-[-50%] before:rotate-45 after:absolute after:top-[50%] after:left-[50%] after:w-1 after:h-7 after:rounded-full after:bg-black after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-[-45deg]"
                  onClick={onClose}
                />
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
