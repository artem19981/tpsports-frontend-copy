'use client';

import React from 'react';

import { Button, Loader } from 'shared/ui';

import { InitialOnboardStep } from 'features/InitialOnboard/model';

import styles from '../OrgansAssessmentForm.module.scss';
import { CancelOnboardButton } from '../../CancelOnboardButton';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { OrgansAssessmentFormFields } from '../components/OrgansAssessmentFormFields';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const OrgansAssessmentOnboardingForm = (props: Props) => {
  const { handleSubmit, control, isPending, isSuccess, onSubmit } =
    useLocalForm(props);

  return (
    <form
      style={{ width: '100%', position: 'relative' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <OrgansAssessmentFormFields control={control} />

      <div className={styles.footer}>
        <CancelOnboardButton nextPage={InitialOnboardStep.Final} />

        <Button
          type="submit"
          className={styles.button}
          disabled={isPending || isSuccess}
        >
          Завершить
        </Button>
      </div>
      {isPending && <Loader />}
    </form>
  );
};
