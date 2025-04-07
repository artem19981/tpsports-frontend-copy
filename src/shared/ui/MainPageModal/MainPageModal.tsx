'use client';

import React, { ReactNode } from 'react';
import { IconButton, Modal, Slide, SlideProps } from '@mui/material';

import styles from './MainPageModal.module.scss';
import closeSrc from '@/app/assets/images/common/close.png';
import Image from 'next/image';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  open?: boolean;
  showCloseBtn?: boolean;

  slideProps?: Partial<SlideProps>;
  contentClassName?: string;
  onClose(): void;
}

export const MainPageModal = ({
  children,
  open = true,
  slideProps,
  contentClassName,
  showCloseBtn = true,
  onClose,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      className={styles.root}
      classes={{
        backdrop: styles.backdrop,
      }}
    >
      <Slide direction="right" in={open} mountOnEnter unmountOnExit {...slideProps}>
        <div className={classNames(styles.content, contentClassName)}>
          {showCloseBtn && (
            <IconButton onClick={onClose} className={styles.closeBtn}>
              <Image src={closeSrc} alt="" width={16} height={16} />
            </IconButton>
          )}

          {children}
        </div>
      </Slide>
    </Modal>
  );
};
