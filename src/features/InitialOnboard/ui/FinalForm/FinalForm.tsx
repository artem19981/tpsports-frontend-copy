'use client';

import React from 'react';

import { Button } from 'shared/ui';

import { useRouter } from 'next/navigation';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

import finalSrc from './assets/final.png';
import ellipseSrc from './assets/ellipse.png';
import Image from 'next/image';

import styles from './FinalForm.module.scss';

export const FinalForm = () => {
  const router = useRouter();

  const onSubmit = () => {
    router.push('/ai');
  };

  return (
    <div className={styles.container}>
      <Image className={styles.final} src={finalSrc} width={85} height={79} alt="" />

      <Image className={styles.ellipse} src={ellipseSrc} width={440} height={437} alt="" />

      <h2 className={styles.title}>Отличная работа!</h2>

      <p className={styles.description}>
        Добро пожаловать в персонализированный мир здоровья, спорта и благополучия!
      </p>

      <Button onClick={onSubmit} className={styles.button}>
        Перейти к своей ИИ Команде
      </Button>
    </div>
  );
};
