import { FC } from 'react';
import { useMenuButton } from '../../hooks/useMenuButton';
import { useMenu } from '../../hooks/useMenu';
import { FrostedGlass } from '../uiParts/FrostedGlass';
import { Modal } from '../uiParts/Modal';
import { Menu } from './Menu';
import menuIcon from '../../assets/img/menuIcon.png';

export const MenuButton: FC = () => {
  const { isOpenMenu, openMenu, closeMenu } = useMenuButton();
  const { isShowBgPreview } = useMenu();

  return (
    <div>
      {!isOpenMenu && (
        <button
          className={`fixed top-4 right-4 z-40 min-[1936px]:right-[calc((100%_-_1920px)_/_2)]`}
          onClick={openMenu}
        >
          <FrostedGlass style={{ padding: '0.5rem' }}>
            <img src={menuIcon} alt="menuIcon" />
          </FrostedGlass>
        </button>
      )}
      {!isShowBgPreview && isOpenMenu && (
        <Modal isOpen={isOpenMenu} isLogin={false} borderColorClass="border-gray-500" onClose={closeMenu}>
          <Menu />
        </Modal>
      )}
    </div>
  );
};
