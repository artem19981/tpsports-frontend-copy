'use client';

import { FC, PropsWithChildren, ReactNode, useState } from 'react';

import cn from 'classnames';
import { useChatType } from 'entities/chat/ui';

import ChatAdd from 'app/assets/images/aiChat/ChatAdd.svg';
import Image from 'next/image';
import { Sidebar } from 'widgets/SideBar/Sidebar';
import { getBackgroundColorByChatType } from '../../lib/getBackgroundColorByChatType';
import styles from './MainLayout.module.scss';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { useRouter } from 'next/navigation';

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

  const createNewChat = () => {
    setActiveChatId(null);
    router.push('/ai/chat/');
  };

  return (
    <div className={cn(styles.container, containerClassName)}>
      <div className={styles.leftCircle} style={{ background: backgrounds?.left }} />
      <div className={styles.rightCircle} style={{ background: backgrounds?.right }} />

      <div className={cn(styles.content, contentClassName)}>
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
