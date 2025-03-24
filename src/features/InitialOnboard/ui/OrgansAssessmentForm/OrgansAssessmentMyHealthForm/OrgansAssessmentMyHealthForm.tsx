'use client';

import React from 'react';

import { Loader, WithAbsoluteScrollBar } from 'shared/ui';

import styles from '../OrgansAssessmentForm.module.scss';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { OrgansAssessmentFormFields } from '../components/OrgansAssessmentFormFields';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const OrgansAssessmentMyHealthForm = (props: Props) => {
  const { handleSubmit, control, isPending, isDirty, onSubmit } =
    useLocalForm(props);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <WithAbsoluteScrollBar>
        <p className={styles.myHealthTitle}>Оценка по органам и системам</p>

        <div className={styles.wrapper}>
          <OrgansAssessmentFormFields control={control} />
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
