import { FC } from 'react';
import { worker } from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/Router';
import { Modal } from './components/projects/Modal';
import { Menu } from './components/projects/Menu';
import { useApp } from './hooks/useApp';
import { useHandleModal } from './hooks/useHandleModal';
import menuIcon from './assets/img/menuIcon.png';

// モックサービスワーカーを起動
worker.start(); // eslint-disable-line @typescript-eslint/no-floating-promises

export const App: FC = () => {
  const { bgImg, bgFilter } = useApp();
  const { isModalOpen, openModal, closeModal } = useHandleModal();

  return (
    <div>
      {!isModalOpen && (
        <button
          className="fixed top-8 right-8 z-50 bg-black bg-opacity-50 p-2"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={openModal}
        >
          <img src={menuIcon} alt="menuIcon" />
        </button>
      )}
      <div className="h-screen relative bg-center bg-cover" style={{ background: `url(${bgImg})` }}>
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, ${bgFilter.colors[0]}, ${bgFilter.colors[1]})`,
            mixBlendMode: bgFilter.mixBrendMode,
          }}
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Menu />
      </Modal>
    </div>
  );
};
