'use client';

import React, { memo, ReactNode } from 'react';
import { Button, MainPageModal } from 'shared/ui';

import styles from './DeleteTariffUserModal.module.scss';
import { useMediaQuery } from '@mui/material';

interface Props {
  open?: boolean;
  onClose(): void;
}

export const DeleteTariffUserModal = memo((props: Props) => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  // tariff

  return (
    <MainPageModal
      {...props}
      contentClassName={styles.modal}
      slideProps={{ direction: isMobile ? 'up' : 'right' }}
      showCloseBtn={!isMobile}
    >
      <div className={styles.container}>
        <p className={styles.text}>
          Вы уверены, что хотите отменить подписку? После отмены доступ к
          премиум-функциям будет закрыт. Вы можете возобновить подписку в любое
          время.
        </p>

        <Button variant="transparent" className={styles.button}>
          ОТМЕНИТЬ ПОДПИСКУ
        </Button>
      </div>
    </MainPageModal>
  );
});

DeleteTariffUserModal.displayName = 'DeleteTariffUserModal';
