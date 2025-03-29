import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { FoodFormInitialOnboarding } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import styles from './Food.module.scss';
import { useRouter } from 'next/navigation';
import { Gender } from 'entities/user';

interface Props {
  userProfile: UserProfile;
}

export const Food = ({ userProfile }: Props) => {
  const router = useRouter();

  const nextStep =
    userProfile.gender === Gender.Male
      ? InitialOnboardStep.OrgansAssessmentPrepare
      : InitialOnboardStep.WomenHealth;

  return (
    <OnboardingLayout
      title="Питание"
      step={InitialOnboardStep.Food}
      childrenClassName={styles.container}
      headerClassName={styles.header}
    >
      <FoodFormInitialOnboarding
        userProfile={userProfile}
        nextStep={nextStep}
        onSuccess={() => router.push(`/initial-onboard?step=${nextStep}`)}
      />
    </OnboardingLayout>
  );
};
