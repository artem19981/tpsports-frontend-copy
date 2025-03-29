'use client';

import React from 'react';

import { Loader, WithAbsoluteScrollBar } from 'shared/ui';

import styles from '../LifestyleForm.module.scss';

import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import { useFadeScroll } from 'shared/lib/hooks/useFadeScroll';
import { LifestylesFormFields } from '../components/LifestylesFormFields';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const LifestyleMyHealthForm = ({ userProfile, onSuccess }: Props) => {
  const ref = useFadeScroll<HTMLDivElement>(1000, 'hide-scroll-opacity');
  const {
    form,
    isAlcoholConsumptionDefined,
    isSleepQualityDefined,
    isPending,
    isDirty,
    control,
    setValue,
    onSubmit,
    handleSubmit,
  } = useLocalForm({
    userProfile,
    onSuccess,
  });

  return (
    <form
      className={styles.myHealthContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <WithAbsoluteScrollBar>
        <div className={styles.myHealthContent} ref={ref}>
          <p className={styles.title}>Образ жизни</p>

          <LifestylesFormFields
            form={form}
            isAlcoholConsumptionDefined={isAlcoholConsumptionDefined}
            isSleepQualityDefined={isSleepQualityDefined}
            setValue={setValue}
            control={control}
            modalClassName={styles.modal}
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
