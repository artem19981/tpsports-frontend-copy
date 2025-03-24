'use client';

import React from 'react';

import { UserProfile } from 'features/User/model';
import { Button } from 'shared/ui';

import { useRouter } from 'next/navigation';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { CancelOnboardButton } from '../CancelOnboardButton';

import muscleSrc from './assets/muscule.png';
import Image from 'next/image';

import styles from './OrgansAssessmentPrepareForm.module.scss';
import { UNBREAKABLE_SEPARATOR } from 'shared/constants/separator';

interface Props {
  userProfile: UserProfile;
}

export const OrgansAssessmentPrepareForm = ({ userProfile }: Props) => {
  const router = useRouter();

  const onSubmit = () => {
    router.push('/initial-onboard?step=' + InitialOnboardStep.OrgansAssessment);
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={muscleSrc}
        width={350}
        height={89}
        alt="muscle"
      />

      <p className={styles.lastStep}>Последний шаг!</p>

      <h2 className={styles.title}>Оцените состояние своего организма</h2>

      <p className={styles.description}>
        Это поможет ИИ-Экспертам учитывать ваши особенности и подбирать
        максимально точные рекомендации.
      </p>

      <Button onClick={onSubmit} className={styles.button}>
        Далее
      </Button>

      <CancelOnboardButton
        label="Заполнить позже"
        nextPage={InitialOnboardStep.Final}
      />
    </div>
  );
};
