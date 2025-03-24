'use client';

import React, { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  trainingInfoSchema,
  TrainingInfoSchema,
} from 'features/InitialOnboard/schemas';
import { UserProfile } from 'features/User/model';
import { useForm } from 'react-hook-form';
import { Button, Loader, useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';
import { useRouter } from 'next/navigation';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import styles from './TrainingInfoForm.module.scss';
import { CancelOnboardButton } from '../CancelOnboardButton';
import isEqual from 'lodash/isEqual';
import { TrainingInfoFormFields } from './components';
import { getTrainingInfoFormDefaultValues } from './lib/getTrainingInfoFormDefaultValues';
import { useOnButtonClick } from './lib/useOnButtonClick';

export const TrainingInfoForm = (userProfile: UserProfile) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(
    () => getTrainingInfoFormDefaultValues(userProfile),
    []
  );

  const { handleSubmit, setValue, watch, register, formState } = useForm({
    defaultValues,
    resolver: yupResolver(trainingInfoSchema),
  });

  const form = watch();

  const { mutate, isPending, isSuccess } = useUpdateUserSettings({
    onSuccess: () => {
      router.push('/initial-onboard?step=' + InitialOnboardStep.SportGoal);
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: TrainingInfoSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);

    console.log({
      ...userProfile,
      training_location: form.training_location || null,
      equipment: form.equipment || null,
      injuries_or_restrictions: form.injuries_or_restrictions || null,
    });

    if (isChanged) {
      mutate({
        ...userProfile,
        training_location: form.training_location || null,
        equipment: form.equipment || null,
        injuries_or_restrictions: form.injuries_or_restrictions || null,
      });
    } else {
      router.push('/initial-onboard?step=' + InitialOnboardStep.SportGoal);
    }
  };

  const handleButtonClick = useOnButtonClick(setValue);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <TrainingInfoFormFields
        form={form}
        handleButtonClick={handleButtonClick}
        register={register}
      />

      <div className={styles.footer}>
        <CancelOnboardButton nextPage={InitialOnboardStep.SportGoal} />
        <Button
          type="submit"
          className={styles.button}
          disabled={isPending || isSuccess}
        >
          Далее
        </Button>
      </div>

      {isPending && <Loader />}
    </form>
  );
};
