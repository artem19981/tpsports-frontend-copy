import React from 'react';
import { OnboardingLayout } from 'app/Layouts';

import { PersonalInformationForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';

interface Props {
  userProfile: UserProfile;
}

export const PersonalInformation = ({ userProfile }: Props) => {
  return (
    <OnboardingLayout
      title="Личная информация"
      step={InitialOnboardStep.PersonalInfo}
    >
      <PersonalInformationForm {...userProfile} />
    </OnboardingLayout>
  );
};
