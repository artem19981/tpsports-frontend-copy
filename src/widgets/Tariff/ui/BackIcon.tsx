'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import Back from 'shared/assets/Back.svg?component';
import styles from './Tariff.module.scss';

interface Props {
  down?: boolean;

  onBack: () => void;
}

export const BackIcon: FC<Props> = ({ down, onBack }) => {
  return (
    <div className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          alignItems: 'center',
          mb: down === true ? 0 : 10,
          mt: down === true ? 9 : 0,
          cursor: 'pointer',
        }}
        onClick={onBack}
      >
        <Back />
        <Typography>Назад к настройкам</Typography>
      </Box>
    </div>
  );
};
