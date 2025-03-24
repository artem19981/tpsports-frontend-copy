'use client';

import React from 'react';
import { Button } from 'shared/ui';
import styles from './CancelOnboardButton.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ButtonProps } from '@mui/material';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

interface Props extends ButtonProps {
  label?: string;
  nextPage: InitialOnboardStep;
}

export const CancelOnboardButton = ({
  label = 'Пропустить',
  nextPage,
  ...props
}: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/initial-onboard?step=' + nextPage);
  };

  return (
    <Button
      variant="transparent"
      className={classNames(styles.button, props?.className)}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
