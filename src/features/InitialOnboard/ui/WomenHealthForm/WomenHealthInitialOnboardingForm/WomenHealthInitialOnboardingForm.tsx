'use client';

import React from 'react';

import { UserProfile } from 'features/User/model';
import { Button, Loader } from 'shared/ui';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { CancelOnboardButton } from '../../CancelOnboardButton';
import { useLocalForm } from '../lib/useLocalForm';
import { WomenHealthFields } from '../components/WomenHealthFields';

import styles from '../WomenHealthForm.module.scss';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const WomenHealthInitialOnboardingForm = (props: Props) => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isShowAllFields,
    isPending,
    isSuccess,
  } = useLocalForm(props);

  return (
    <form
      style={{ width: '100%', position: 'relative' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <WomenHealthFields control={control} isShowAllFields={isShowAllFields} />

      <div className={styles.footer}>
        <CancelOnboardButton
          nextPage={InitialOnboardStep.OrgansAssessmentPrepare}
        />

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
