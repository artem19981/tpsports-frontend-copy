'use client';

import React, { memo } from 'react';

import BorderArrow from 'shared/assets/borderArrow.svg?component';
import { IconButton, LinearProgress, Stack } from '@mui/material';
import { getStepData } from './lib/getStepData';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { useRouter } from 'next/navigation';

import styles from './OnboardProgressBar.module.scss';

interface Props {
  step: InitialOnboardStep;
  isWomen?: boolean;
}

export const OnboardProgressBar = memo(({ step, isWomen = false }: Props) => {
  const router = useRouter();

  const stepData = getStepData(step, isWomen);

  if (!stepData) {
    return null;
  }

  const isLastStep = stepData.value === 100;

  return (
    <Stack
      gap={4}
      direction="row"
      alignItems="center"
      className={styles.container}
    >
      <IconButton onClick={() => router.push(stepData.prevPage)}>
        <BorderArrow />
      </IconButton>

      {!isLastStep && (
        <LinearProgress
          variant="determinate"
          value={stepData.value}
          className={styles.progress}
        />
      )}
    </Stack>
  );
});

OnboardProgressBar.displayName = 'OnboardProgressBar';
