'use client';

import React from 'react';

import { Button, Loader } from 'shared/ui';

import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { CancelOnboardButton } from '../../CancelOnboardButton';
import styles from '../LifestyleForm.module.scss';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { LifestylesFormFields } from '../components/LifestylesFormFields';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const LifestyleInitialOnboardingForm = ({
  userProfile,
  onSuccess,
}: Props) => {
  const {
    form,
    isAlcoholConsumptionDefined,
    isSleepQualityDefined,
    isPending,
    isSuccess,
    control,
    setValue,
    onSubmit,
    handleSubmit,
  } = useLocalForm({
    userProfile,
    onSuccess,
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <LifestylesFormFields
        form={form}
        isAlcoholConsumptionDefined={isAlcoholConsumptionDefined}
        isSleepQualityDefined={isSleepQualityDefined}
        setValue={setValue}
        control={control}
      />

      <div className={styles.footer}>
        <CancelOnboardButton nextPage={InitialOnboardStep.Food} />

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
