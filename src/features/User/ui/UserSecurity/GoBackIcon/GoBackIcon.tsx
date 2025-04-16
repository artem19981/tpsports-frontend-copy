import { Stack, IconButton } from '@mui/material';
import React from 'react';
import BorderArrow from 'shared/assets/borderArrow.svg?component';
import styles from './GoBackIcon.module.scss';

interface Props {
  onClose: () => void;
}

export const GoBackIcon = ({ onClose }: Props) => {
  return (
    <Stack direction="row" alignItems="center" className={styles.iconWrapper}>
      <IconButton onClick={onClose}>
        <BorderArrow />
      </IconButton>
    </Stack>
  );
};
