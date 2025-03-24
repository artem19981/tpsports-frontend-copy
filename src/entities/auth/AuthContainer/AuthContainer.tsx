'use client';

import { ReactNode } from 'react';

import { Stack } from '@mui/material';

import { useRouter } from 'next/navigation';

import styles from './AuthContainer.module.css';
import Cross from '@/app/assets/images/aiChat/cross.svg?component';
import { IconButton } from 'shared/ui';

interface Props {
  form: ReactNode;
  afterForm: ReactNode;
}

export function AuthContainer({ form, afterForm }: Props) {
  const router = useRouter();

  return (
    <Stack direction="column" alignItems="center" position="relative">
      <div className={styles.content}>
        <IconButton
          onClick={() => router.push('/ai')}
          className={styles.cross}
          size="large"
        >
          <Cross />
        </IconButton>
        <div>{form}</div>
        {afterForm}
      </div>
    </Stack>
  );
}
