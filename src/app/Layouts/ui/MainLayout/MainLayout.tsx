'use client';

import React, { FC, PropsWithChildren, ReactNode } from 'react';

import cn from 'classnames';
import { useChatType } from 'entities/chat/ui';
import { UserSettingsMenu } from 'features/User';
import Image from 'next/image';
import Link from 'next/link';

import styles from './MainLayout.module.scss';
import logoImg from '@/app/assets/images/aiChat/logo/logo.png';
import whiteLogo from '@/app/assets/images/aiChat/logo/tps-white.png';
import { getBackgroundColorByChatType } from '../../lib/getBackgroundColorByChatType';

interface Props {
  links?: ReactNode;
  withUserMenu?: boolean;

  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  childrenClassName?: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  children,
  links,
  containerClassName,
  headerClassName,
  contentClassName,
  childrenClassName,
  withUserMenu = true,
}) => {
  const chatTypeContext = useChatType();

  const backgrounds = getBackgroundColorByChatType(chatTypeContext?.chatType);

  return (
    <div className={cn(styles.container, containerClassName)}>
      <div
        className={styles.leftCircle}
        style={{ background: backgrounds?.left }}
      />
      <div
        className={styles.rightCircle}
        style={{ background: backgrounds?.right }}
      />

      <div className={cn(styles.content, contentClassName)}>
        <div className={cn(styles.header, headerClassName)}>
          <div className={styles.logoWrapper}>
            <Link
              href="/ai"
              onClick={() => chatTypeContext?.setChatType?.(undefined)}
              style={{ display: 'flex' }}
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

          {!!links && <div className={styles.desktopLinks}>{links}</div>}

          {withUserMenu && <UserSettingsMenu />}
        </div>

        <div className={cn(styles.children, childrenClassName)}>
          {!!links && <div className={styles.mobileLinks}>{links}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};
