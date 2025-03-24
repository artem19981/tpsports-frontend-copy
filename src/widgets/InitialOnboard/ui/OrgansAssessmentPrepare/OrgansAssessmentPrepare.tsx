import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { OrgansAssessmentPrepareForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import styles from './OrgansAssessmentPrepare.module.scss';
import Image from 'next/image';
import eliplseSrc from './assets/eliplse.png';
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
      content={
        <Image
          className={styles.elipse}
          src={eliplseSrc}
          alt=""
          width={814}
          height={809}
        />
      }
    >
      <OrgansAssessmentPrepareForm userProfile={userProfile} />
    </OnboardingLayout>
  );
};
