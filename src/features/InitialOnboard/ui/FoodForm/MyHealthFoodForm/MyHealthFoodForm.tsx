'use client';

import React from 'react';

import { Loader, WithAbsoluteScrollBar } from 'shared/ui';

import styles from '../FoodForm.module.scss';
import { FoodForm } from '../components/FoodForm';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const MyHealthFoodForm = ({ userProfile, onSuccess }: Props) => {
  const {
    isDailyWaterIntakeDefined,
    form,
    handleSubmit,
    register,
    isPending,
    control,
    isDirty,
    onSubmit,
  } = useLocalForm({ userProfile, onSuccess });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <WithAbsoluteScrollBar>
        <p className={styles.myHealthTitle}>Питание</p>

        <div className={styles.myHealthWrapper}>
          <FoodForm
            control={control}
            form={form}
            register={register}
            isDailyWaterIntakeDefined={isDailyWaterIntakeDefined}
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
