'use client';

import React from 'react';
import Image from 'next/image';
import { OnboardingLayout } from 'app/Layouts';
import logo from '@/app/assets/images/aiChat/logo/logo.png';
import peoples from './assets/peoples.png';
import ellipse from './assets/ellipse.png';

import { Chip, Typography } from '@mui/material';
import { Button, Loader, useSnackbar } from 'shared/ui';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import { useRouter } from 'next/navigation';
import { useUpdateUserSettings } from 'features/User/lib';

import styles from './InitialStep.module.scss';

interface Props {
  userProfile: UserProfile;
}

export const InitialStep = ({ userProfile }: Props) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const { mutate, isPending, isSuccess } = useUpdateUserSettings({
    onSuccess: () => {
      router.push('/ai');
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
      router.push('/ai');
    },
  });

  const onClick = () => {
    mutate({ ...userProfile, is_completed: true });
  };

  return (
    <OnboardingLayout withHeader={false} step={InitialOnboardStep.Initial}>
      <Image
        className={styles.logo}
        src={logo}
        alt="logo"
        height={32}
        width={59.5}
      />

      <div className={styles.peoplesContainer}>
        <Image
          className={styles.peoples}
          src={peoples}
          alt="peoples"
          height={78}
          width={225}
        />

        <Image
          className={styles.peoplesBackground}
          src={ellipse}
          alt="ellipse"
          height={437}
          width={440}
          draggable={false}
        />
      </div>

      <Typography className={styles.title}>Данные о моём здоровье</Typography>

      <Typography className={styles.subtitle}>
        ИИ-Эксперты проанализируют ваши данные и создадут персональные решения
        именно для ваших целей.
      </Typography>
      <Typography className={styles.secondSubtitle}>
        Начните путь к лучшей версии себя!
      </Typography>

      <Chip
        className={styles.chip}
        label="Время прохождения - 5 мин"
        variant="outlined"
      />

      <Button
        className={styles.furtherButton}
        href={`initial-onboard?step=${InitialOnboardStep.PersonalInfo}`}
      >
        Далее
      </Button>

      <Button
        variant="transparent"
        className={styles.cancelButton}
        onClick={onClick}
        disabled={isPending || isSuccess}
      >
        Заполнить позже
      </Button>

      {isPending || (isSuccess && <Loader />)}
    </OnboardingLayout>
  );
};
