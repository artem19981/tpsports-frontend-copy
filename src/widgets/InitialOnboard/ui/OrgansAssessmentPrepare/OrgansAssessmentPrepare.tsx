import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { OrgansAssessmentPrepareForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import styles from './OrgansAssessmentPrepare.module.scss';
import { UserProfile } from 'features/User/model';

interface Props {
  userProfile: UserProfile;
}

export const OrgansAssessmentPrepare = ({ userProfile }: Props) => {
  return (
    <OnboardingLayout
      step={InitialOnboardStep.OrgansAssessmentPrepare}
      childrenClassName={styles.container}
      isWomen={userProfile.gender === 'женщина'}
    >
      <OrgansAssessmentPrepareForm userProfile={userProfile} />
    </OnboardingLayout>
  );
};
