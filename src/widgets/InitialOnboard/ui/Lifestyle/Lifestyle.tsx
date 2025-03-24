import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { LifestyleInitialOnboardingForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import { useRouter } from 'next/navigation';
import styles from './Lifestyle.module.scss';

interface Props {
  userProfile: UserProfile;
}

export const Lifestyle = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout
      title="Образ жизни"
      step={InitialOnboardStep.Lifestyle}
      childrenClassName={styles.children}
    >
      <LifestyleInitialOnboardingForm
        userProfile={userProfile}
        onSuccess={() =>
          router.push('/initial-onboard?step=' + InitialOnboardStep.Food)
        }
      />
    </OnboardingLayout>
  );
};
