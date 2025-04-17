import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { StrengthTrainingFormInitialOnboarding } from 'features/InitialOnboard/';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import styles from './StrengthTraining.module.scss';
import { useRouter } from 'next/navigation';

interface Props {
  userProfile: UserProfile;
}

export const StrengthTraining = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout
      title="Спорт"
      step={InitialOnboardStep.StrengthTraining}
      childrenClassName={styles.children}
    >
      <StrengthTrainingFormInitialOnboarding
        userProfile={userProfile}
        onSuccess={() => router.push('/initial-onboard?step=' + InitialOnboardStep.TrainingInfo)}
      />
    </OnboardingLayout>
  );
};
