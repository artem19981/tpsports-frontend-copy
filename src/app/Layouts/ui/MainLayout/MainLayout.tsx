'use client';

import { FC, PropsWithChildren, ReactNode, useState } from 'react';

import closeSrc from '@/app/assets/images/common/close.png';
import cn from 'classnames';
import { useChatType } from 'entities/chat/ui';

import { IconButton, useMediaQuery } from '@mui/material';
import ChatAdd from 'app/assets/images/aiChat/ChatAdd.svg';
import Home from 'app/assets/images/aiChat/Home.svg';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BlurCirclesBackground, MainLayoutContainer, MainLayoutContent } from 'shared/ui';
import { useMyHealthModal } from 'widgets/MyHealth';
import { Sidebar } from 'widgets/SideBar/Sidebar';
import { useSettingsModal } from 'widgets/UserSettings';
import { getBackgroundColorByChatType } from '../../lib/getBackgroundColorByChatType';
import styles from './MainLayout.module.scss';

interface Props {
  links?: ReactNode;
  withUserMenu?: boolean;
  withCreateChatButton?: boolean;

  headerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  childrenClassName?: string;

  onCrossClick?: () => void;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  children,
  links,
  onCrossClick,
  containerClassName,
  contentClassName,
  childrenClassName,
  withUserMenu = true,
}) => {
  const router = useRouter();
  const chatTypeContext = useChatType();

  const setActiveChatId = useSetActiveChatId();

  const backgrounds = getBackgroundColorByChatType(chatTypeContext?.chatType);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isMyHealthModalOpen] = useMyHealthModal();
  const [isSettingsModalOpen] = useSettingsModal();

  const isChangeLayoutPosition = isMyHealthModalOpen || isSettingsModalOpen;

  const isMobile = useMediaQuery('(max-width: 600px)');

  const createNewChat = () => {
    setActiveChatId(null);
    router.push('/ai/chat/');
  };

  return (
    <MainLayoutContainer
      className={cn(containerClassName, {
        [styles.changeLayoutPosition]: isChangeLayoutPosition,
      })}
    >
      <div className={cn(styles.wrapper)}>
        <BlurCirclesBackground
          mobile={isMobile}
          color={backgrounds?.animate || 'rgba(5, 239, 182, 0.4)'}
        />

        <MainLayoutContent
          className={cn(contentClassName, {
            [styles.changeLayoutPositionContent]: isChangeLayoutPosition,
          })}
        >
          {withUserMenu && (
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
          )}

          {onCrossClick && (
            <IconButton size="large" onClick={onCrossClick} className={styles.closeBtn}>
              <Image src={closeSrc} alt="" width={18} height={18} />
            </IconButton>
          )}

          <div className={cn(styles.children, childrenClassName)} id="children">
            {withUserMenu && chatTypeContext?.chatType && (
              <div className={styles.iconContainer}>
                <Image
                  src={ChatAdd}
                  alt="ChatAdd"
                  className={styles.chatAdd}
                  onClick={createNewChat}
                />
                <Image
                  src={Home}
                  alt="Home"
                  className={styles.Home}
                  onClick={() => {
                    router.push('/ai');
                  }}
                />
              </div>
            )}
            {!!links && <div className={styles.desktopLinks}>{links}</div>}
            {!!links && <div className={styles.mobileLinks}>{links}</div>}

            {children}
          </div>
        </MainLayoutContent>
      </div>
    </MainLayoutContainer>
  );
};
