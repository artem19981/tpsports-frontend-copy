'use client';

import { Dialog, Stack } from '@mui/material';
import React, { memo } from 'react';
import styles from './FullScreenDialog.module.scss';
import { IconButton } from '../IconButton/IconButton';
import BorderArrow from 'shared/assets/borderArrow.svg?component';

interface Props {
  open: boolean;
  children: React.ReactNode;

  className?: string;
  onClose: () => void;
}

export const FullScreenDialog = memo(
  ({ open, children, className, onClose }: Props) => {
    return (
      <Dialog fullScreen open={open} onClose={onClose} className={className}>
        <div className={styles.content}>
          <Stack
            gap={4}
            direction="row"
            alignItems="center"
            className={styles.iconWrapper}
          >
            <IconButton onClick={onClose}>
              <BorderArrow />
            </IconButton>
          </Stack>

          {children}
        </div>
      </Dialog>
    );
  }
);

FullScreenDialog.displayName = 'FullScreenDialog';
