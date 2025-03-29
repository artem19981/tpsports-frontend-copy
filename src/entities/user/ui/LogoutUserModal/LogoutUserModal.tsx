'use client';

import React, { memo, ReactNode } from 'react';
import { MainPageModal } from 'shared/ui';

import styles from './LogoutUserModal.module.scss';
import { useMediaQuery } from '@mui/material';

interface Props {
  children: ReactNode;
  open?: boolean;
  onClose(): void;
}

export const LogoutUserModal = memo(({ children, ...props }: Props) => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  return (
    <MainPageModal
      {...props}
      contentClassName={styles.modal}
      slideProps={{ direction: isMobile ? 'up' : 'right' }}
      showCloseBtn={!isMobile}
    >
      <div className={styles.container}>
        {children}

        <p className={styles.text}>
          Завершение всех сеансов на других устройствах. После выхода
          потребуется повторный вход.
        </p>
      </div>
    </MainPageModal>
  );
});

LogoutUserModal.displayName = 'LogoutUserModal';
