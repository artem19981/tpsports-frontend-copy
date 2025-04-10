'use client';

import { ReactNode } from 'react';

import { Stack } from '@mui/material';

import styles from './AuthContainer.module.css';
import classNames from 'classnames';

interface Props {
  form: ReactNode;
  afterForm: ReactNode;

  className?: string;
  contentClassName?: string;
}

export function AuthContainer({ form, afterForm, className, contentClassName }: Props) {
  return (
    <Stack direction="column" alignItems="center" position="relative" className={className}>
      <div className={classNames(styles.content, contentClassName)}>
        <div>{form}</div>
        {afterForm}
      </div>
    </Stack>
  );
}
