'use client';

import React from 'react';

import { Loader, WithAbsoluteScrollBar } from 'shared/ui';

import styles from '../FoodForm.module.scss';
import { FoodForm } from '../components/FoodForm';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import { MentalHealthForm } from '../components/MentalHealthForm';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const MyHealthMentalHealthForm = ({ userProfile, onSuccess }: Props) => {
  const {
    isMemoryDefined,
    isLearningDefined,
    handleSubmit,
    isPending,
    control,
    isDirty,
    onSubmit,
  } = useLocalForm({ userProfile, onSuccess });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <WithAbsoluteScrollBar>
        <p className={styles.myHealthTitle}>Ментальное здоровье</p>

        <div className={styles.myHealthWrapper}>
          <MentalHealthForm
            control={control}
            isLearningDefined={isLearningDefined}
            isMemoryDefined={isMemoryDefined}
          />
        </div>
      </WithAbsoluteScrollBar>

      <MyHealthFormSubmitButton
        type="submit"
        disabled={isPending}
        visible={isDirty}
      />

      {isPending && <Loader />}
    </form>
  );
};
