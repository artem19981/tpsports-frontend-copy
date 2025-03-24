import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { SportAndActivityFormInitialOnboarding } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import styles from './SportAndActivity.module.scss';
import { useRouter } from 'next/navigation';

interface Props {
  userProfile: UserProfile;
}

export const SportAndActivity = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout
      title="Спорт и Активность"
      step={InitialOnboardStep.Sport}
      childrenClassName={styles.container}
      headerClassName={styles.header}
    >
      <SportAndActivityFormInitialOnboarding
        userProfile={userProfile}
        onSuccess={() => {
          router.push(
            '/initial-onboard?step=' + InitialOnboardStep.StrengthTraining
          );
        }}
      />
    </OnboardingLayout>
  );
};
