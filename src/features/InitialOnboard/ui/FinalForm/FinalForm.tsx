'use client';

import React from 'react';

import { Button } from 'shared/ui';

import { useRouter } from 'next/navigation';

import finalSrc from './assets/final.png';
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

      <h2 className={styles.title}>Отличная работа !</h2>

      <p className={styles.description}>
        Ваш персональный ИИ отчёт готов и отправлен на электронную почту. Наши ИИ Эксперты уже ждут
        вас !
      </p>

      <Button onClick={onSubmit} className={styles.button}>
        Перейти к своим ИИ Экспертам
      </Button>

      <Button variant="lightTransparent">Скачать отчет</Button>
    </div>
  );
};
