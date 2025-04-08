'use client';

import { FC, PropsWithChildren, ReactNode, useState } from 'react';

import cn from 'classnames';
import { useChatType } from 'entities/chat/ui';

import ChatAdd from 'app/assets/images/aiChat/ChatAdd.svg';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMyHealthModal } from 'widgets/MyHealth';
import { Sidebar } from 'widgets/SideBar/Sidebar';
import { useSettingsModal } from 'widgets/UserSettings';
import { getBackgroundColorByChatType } from '../../lib/getBackgroundColorByChatType';
import { BlurCirclesBackground } from './BlurCirclesBackground';
import styles from './MainLayout.module.scss';

interface Props {
  links?: ReactNode;
  withUserMenu?: boolean;
  withCreateChatButton?: boolean;

  headerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  childrenClassName?: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  children,
  links,
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

  const createNewChat = () => {
    setActiveChatId(null);
    router.push('/ai/chat/');
  };

  return (
    <div
      className={cn(styles.container, containerClassName, {
        [styles.changeLayoutPosition]: isChangeLayoutPosition,
      })}
    >
      <BlurCirclesBackground color={backgrounds?.animate || '#05EFB6'} />
      <div className={styles.leftCircle} style={{ background: backgrounds?.left }} />
      <div className={styles.rightCircle} style={{ background: backgrounds?.right }} />

      <div
        className={cn(styles.content, contentClassName, {
          [styles.changeLayoutPosition]: isChangeLayoutPosition,
        })}
      >
        {/* <div className={cn(styles.header, headerClassName)}>
          <div className={styles.logoWrapper}>
            <Link
              href="/ai"
              onClick={() => chatTypeContext?.setChatType?.(undefined)}
              style={{ display: "flex" }}
            >
              <Image
                src={chatTypeContext?.chatType ? whiteLogo : logoImg}
                alt="logo"
                className={styles.logo}
                height={28}
                width={52}
              />
            </Link>
          </div>

          {withUserMenu && <UserSettingsMenu />}
        </div> */}
        {withUserMenu && (
          <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        )}

        <div className={cn(styles.children, childrenClassName)} id="children">
          {withUserMenu && chatTypeContext?.chatType && (
            <Image src={ChatAdd} alt="ChatAdd" className={styles.chatAdd} onClick={createNewChat} />
          )}
          {!!links && <div className={styles.desktopLinks}>{links}</div>}
          {!!links && <div className={styles.mobileLinks}>{links}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};
