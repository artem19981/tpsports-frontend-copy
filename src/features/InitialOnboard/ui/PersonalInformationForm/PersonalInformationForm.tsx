'use client';

import React from 'react';

import { UserProfile } from 'features/User/model';
import { Button, Loader } from 'shared/ui';

import { useRouter } from 'next/navigation';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

import styles from './PersonalInformationForm.module.scss';
import { useUserPersonalInfoForm } from 'features/User';
import { UserPersonalInfoFormFields } from 'entities/user';

export const PersonalInformationForm = (userProfile: UserProfile) => {
  const router = useRouter();

  const { handleSubmit, onSubmit, control, birthDate, setValue, isPending } =
    useUserPersonalInfoForm({
      userProfile,
      onSuccess: () => {
        router.push('/initial-onboard?step=' + InitialOnboardStep.BodyMeasurement);
      },
    });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <UserPersonalInfoFormFields
        control={control}
        birthDate={birthDate}
        setValue={setValue}
        inputWrapperClassName={styles.inputWrapper}
      />

      <Button type="submit" className={styles.button} disabled={isPending}>
        Далее
      </Button>

      {isPending && <Loader />}
    </form>
  );
};
