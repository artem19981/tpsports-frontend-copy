import React from 'react';

import { OnboardingLayout } from 'app/Layouts';
import { FinalForm } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import styles from './Final.module.scss';

export const Final = () => {
  return (
    <OnboardingLayout
      step={InitialOnboardStep.Final}
      childrenClassName={styles.container}
    >
      <FinalForm />
    </OnboardingLayout>
  );
};
