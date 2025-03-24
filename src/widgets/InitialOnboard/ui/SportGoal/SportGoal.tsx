'use client';

import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { SportGoalFormInitialOnboarding } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import { useRouter } from 'next/navigation';

interface Props {
  userProfile: UserProfile;
}

export const SportGoal = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout title="Цели" step={InitialOnboardStep.SportGoal}>
      <SportGoalFormInitialOnboarding
        userProfile={userProfile}
        onSuccess={() =>
          router.push('/initial-onboard?step=' + InitialOnboardStep.Lifestyle)
        }
      />
    </OnboardingLayout>
  );
};
