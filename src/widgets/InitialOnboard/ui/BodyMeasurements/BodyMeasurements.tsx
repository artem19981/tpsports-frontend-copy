'use client';
import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { BodyMeasurementsInitialOnboardingForm } from 'features/InitialOnboard/';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import { useRouter } from 'next/navigation';

interface Props {
  userProfile: UserProfile;
}

export const BodyMeasurements = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout
      title="Измерения тела"
      step={InitialOnboardStep.BodyMeasurement}
    >
      <BodyMeasurementsInitialOnboardingForm
        userProfile={userProfile}
        onSuccess={() =>
          router.push('/initial-onboard?step=' + InitialOnboardStep.Sport)
        }
      />
    </OnboardingLayout>
  );
};
