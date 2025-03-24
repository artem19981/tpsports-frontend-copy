import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { OrgansAssessmentOnboardingForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import styles from './OrgansAssessment.module.scss';
import { UNBREAKABLE_SEPARATOR } from 'shared/constants/separator';
import { useRouter } from 'next/navigation';

interface Props {
  userProfile: UserProfile;
}

export const OrgansAssessment = ({ userProfile }: Props) => {
  const router = useRouter();

  return (
    <OnboardingLayout
      title={`Оценка по органам и${UNBREAKABLE_SEPARATOR}системам`}
      step={InitialOnboardStep.OrgansAssessment}
      childrenClassName={styles.container}
    >
      <OrgansAssessmentOnboardingForm
        userProfile={userProfile}
        onSuccess={() =>
          router.push('/initial-onboard?step=' + InitialOnboardStep.Final)
        }
      />
    </OnboardingLayout>
  );
};
