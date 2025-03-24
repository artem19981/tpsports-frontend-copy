'use client';

import React, { ReactNode, memo } from 'react';

import { IconButton, Stack, Typography } from '@mui/material';

import Checkmark from 'shared/assets/rounded-checkmark.svg?component';

import Error from './assets/error.svg?component';
import styles from './ActionResult.module.scss';
import Cross from '@/app/assets/images/aiChat/cross.svg?component';
import { useRouter } from 'next/navigation';
import { ActionStatus } from './model/ActionStatus';

interface Props {
  title: string;
  status?: ActionStatus;
  subtitle?: string;

  action?: ReactNode;

  withClosing?: boolean;
}

export const ActionResult = memo(
  ({ title, status, subtitle, action, withClosing = true }: Props) => {
    const router = useRouter();

    return (
      <Stack
        alignItems="center"
        width={'100%'}
        maxWidth="400px"
        position="relative"
        padding={2}
        paddingTop={5}
      >
        <Typography className={styles.title} color="#858585">
          {title}
        </Typography>

        {status === ActionStatus.Success && (
          <Checkmark color="#06F35A" className={styles.icon} />
        )}
        {status === ActionStatus.Error && (
          <Error color="red" className={styles.icon} />
        )}

        {subtitle && (
          <Typography className={styles.subtitle} color="#fff">
            {subtitle}
          </Typography>
        )}

        {withClosing && (
          <IconButton
            onClick={() => router.push('/ai')}
            className={styles.close}
            size="large"
          >
            <Cross />
          </IconButton>
        )}

        {action}
      </Stack>
    );
  }
);

ActionResult.displayName = 'ActionResult';
