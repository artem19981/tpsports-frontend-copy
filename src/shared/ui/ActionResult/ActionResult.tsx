'use client';

import React, { ReactNode, memo } from 'react';

import { Stack, Typography } from '@mui/material';

import Checkmark from 'shared/assets/rounded-checkmark.svg?component';

import Error from './assets/error.svg?component';
import styles from './ActionResult.module.scss';
import { ActionStatus } from './model/ActionStatus';

interface Props {
  title: string;
  status?: ActionStatus;
  subtitle?: string;

  action?: ReactNode;
}

export const ActionResult = memo(({ title, status, subtitle, action }: Props) => {
  return (
    <Stack alignItems="center" width={'100%'} maxWidth="380px" position="relative" padding={2}>
      <Typography className={styles.title} color="#E1E1E1">
        {title}
      </Typography>

      {status === ActionStatus.Success && <Checkmark color="#06F35A" className={styles.icon} />}
      {status === ActionStatus.Error && <Error color="red" className={styles.icon} />}

      {subtitle && (
        <Typography className={styles.subtitle} color="#fff">
          {subtitle}
        </Typography>
      )}

      {action}
    </Stack>
  );
});

ActionResult.displayName = 'ActionResult';
