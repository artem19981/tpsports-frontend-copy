import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { WomenHealthInitialOnboardingForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import styles from './WomenHealth.module.scss';
import { useRouter } from 'next/navigation';

interface Props {
  userProfile: UserProfile;
}

export const WomenHealth = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout
      title="Женское здоровье"
      step={InitialOnboardStep.WomenHealth}
      childrenClassName={styles.container}
    >
      <WomenHealthInitialOnboardingForm
        userProfile={userProfile}
        onSuccess={() => {
          router.push(
            '/initial-onboard?step=' +
              InitialOnboardStep.OrgansAssessmentPrepare
          );
        }}
      />
    </OnboardingLayout>
  );
};
