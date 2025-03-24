'use client';

import React from 'react';

import { Button, Loader } from 'shared/ui';

import { CancelOnboardButton } from '../../CancelOnboardButton';
import { Divider, Stack } from '@mui/material';
import classNames from 'classnames';

import styles from '../FoodForm.module.scss';
import { FoodForm } from '../components/FoodForm';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { MentalHealthForm } from '../components/MentalHealthForm';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

interface Props {
  userProfile: UserProfile;
  nextStep: InitialOnboardStep;
  onSuccess: () => void;
}

export const FoodFormInitialOnboarding = ({
  userProfile,
  nextStep,
  onSuccess,
}: Props) => {
  const {
    isDailyWaterIntakeDefined,
    isMemoryDefined,
    isLearningDefined,
    form,
    handleSubmit,
    register,
    isPending,
    isSuccess,
    control,
    onSubmit,
  } = useLocalForm({ userProfile, onSuccess });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <FoodForm
          control={control}
          form={form}
          register={register}
          isDailyWaterIntakeDefined={isDailyWaterIntakeDefined}
        />
      </div>

      <Divider className={styles.divider} />

      <div className={styles.wrapper}>
        <p className={styles.title}>Ментальное здоровье</p>

        <MentalHealthForm
          control={control}
          isLearningDefined={isLearningDefined}
          isMemoryDefined={isMemoryDefined}
        />
      </div>

      <div className={classNames(styles.footer, styles.wrapper)}>
        <CancelOnboardButton nextPage={nextStep} />

        <Button
          type="submit"
          className={styles.button}
          disabled={isPending || isSuccess}
        >
          Далее
        </Button>
      </div>

      {isPending && <Loader />}
    </form>
  );
};
