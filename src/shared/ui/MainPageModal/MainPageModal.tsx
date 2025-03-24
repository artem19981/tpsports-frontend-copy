import React, { ReactNode } from 'react';
import { IconButton, Modal, Slide } from '@mui/material';

import styles from './MainPageModal.module.scss';
import closeSrc from '@/app/assets/images/common/close.png';
import Image from 'next/image';

interface Props {
  children: ReactNode;

  onClose(): void;
}

export const MainPageModal = ({ children, onClose }: Props) => {
  return (
    <Modal
      open
      onClose={onClose}
      closeAfterTransition
      className={styles.root}
      classes={{
        backdrop: styles.backdrop,
      }}
    >
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <div className={styles.content}>
          <IconButton onClick={onClose} className={styles.closeBtn}>
            <Image src={closeSrc} alt="" width={16} height={16} />
          </IconButton>

          {children}
        </div>
      </Slide>
    </Modal>
  );
};
