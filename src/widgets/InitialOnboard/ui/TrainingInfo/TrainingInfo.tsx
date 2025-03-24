import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { TrainingInfoForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import styles from './TrainingInfo.module.scss';

interface Props {
  userProfile: UserProfile;
}

export const TrainingInfo = ({ userProfile }: Props) => {
  return (
    <OnboardingLayout
      step={InitialOnboardStep.TrainingInfo}
      childrenClassName={styles.container}
      headerClassName={styles.header}
    >
      <TrainingInfoForm {...userProfile} />
    </OnboardingLayout>
  );
};
