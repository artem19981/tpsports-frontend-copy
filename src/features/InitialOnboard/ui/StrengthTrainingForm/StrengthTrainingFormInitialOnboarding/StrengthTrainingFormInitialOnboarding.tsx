'use client';

import React from 'react';

import { UserProfile } from 'features/User/model';
import { Button, Loader } from 'shared/ui';

import { useLocalForm } from '../lib/useLocalForm';

import styles from '../StrengthTrainingForm.module.scss';
import { StrengthTrainingFormFields } from '../components/StrengthTrainingFormFields';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const StrengthTrainingFormInitialOnboarding = ({ userProfile, onSuccess }: Props) => {
  const {
    handleSubmit,
    onSubmit,
    favoriteTrainingTypes,
    favoriteTrainingTypesOther,
    isPending,
    setValue,
  } = useLocalForm({ userProfile, onSuccess });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <StrengthTrainingFormFields
        favoriteTrainingTypes={favoriteTrainingTypes}
        favoriteTrainingTypesOther={favoriteTrainingTypesOther}
        setValue={setValue}
      />

      <div className={styles.footer}>
        <Button type="submit" className={styles.button} disabled={isPending}>
          Далее
        </Button>
      </div>

      {isPending && <Loader />}
    </form>
  );
};
