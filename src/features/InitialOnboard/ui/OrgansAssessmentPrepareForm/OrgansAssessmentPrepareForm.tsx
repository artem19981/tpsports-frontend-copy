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
      <Image className={styles.image} src={muscleSrc} width={350} height={89} alt="muscle" />

      <h2 className={styles.title}>Последний шаг !</h2>

      <p className={styles.description}>
        Каждый ваш ответ делает рекомендации от ИИ Экспертов ещё точнее, а отчёт полезнее.
      </p>

      <Button onClick={onSubmit} className={styles.button}>
        Далее
      </Button>

      <CancelOnboardButton label="Заполнить позже" nextPage={InitialOnboardStep.Final} />
    </div>
  );
};
