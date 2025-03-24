'use client';

import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  PersonalInformationSchema,
  personalInformationSchema,
} from 'features/InitialOnboard/schemas';
import { UserProfile } from 'features/User/model';
import { useForm } from 'react-hook-form';
import {
  Button,
  ControlledInput,
  Loader,
  PhoneNumberInput,
  ControlledToggleButtons,
  useSnackbar,
} from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';
import { useRouter } from 'next/navigation';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

import styles from './PersonalInformationForm.module.scss';
import isEqual from 'lodash/isEqual';
import { DateWheelPicker } from 'shared/ui/DateWheelPicker';

export const PersonalInformationForm = (userProfile: UserProfile) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const { handleSubmit, watch, setValue, control, formState } = useForm({
    defaultValues: {
      gender: userProfile.gender || 'женщина',
      first_name: userProfile.first_name || '',
      last_name: userProfile.last_name || '',
      birth_date: userProfile.birth_date || '',
      phone_number: userProfile.phone_number || '',
    },
    resolver: yupResolver(personalInformationSchema),
  });

  const { mutate, isPending } = useUpdateUserSettings({
    onSuccess: () => {
      router.push(
        '/initial-onboard?step=' + InitialOnboardStep.BodyMeasurement
      );
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: PersonalInformationSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);
    console.log({
      ...userProfile,
      ...form,
      ...(form.gender === 'мужчина' && {
        menopause: null,
        regular_periods: null,
        painful_periods: null,
        pregnancy: null,
        planning_pregnancy: null,
        breastfeeding: null,
      }),
      birth_date: form.birth_date || null,
      phone_number: form.phone_number || null,
      first_name: form.first_name || null,
      last_name: form.last_name || null,
    });

    const gender = form.gender as UserProfile['gender'];

    if (isChanged) {
      mutate({
        ...userProfile,
        ...form,
        gender,
        ...(gender === 'мужчина' && {
          menopause: null,
          regular_periods: null,
          painful_periods: null,
          pregnancy: null,
          planning_pregnancy: null,
          breastfeeding: null,
        }),
        birth_date: form.birth_date || null,
        phone_number: form.phone_number || null,
        first_name: form.first_name || null,
        last_name: form.last_name || null,
      });
    } else {
      router.push(
        '/initial-onboard?step=' + InitialOnboardStep.BodyMeasurement
      );
    }
  };

  const birthDate = watch('birth_date');

  return (
    <form
      style={{ width: '100%', position: 'relative' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <ControlledInput
          containerClassName={styles.input}
          inputWrapperClassName={styles.inputWrapper}
          label="Имя"
          control={control}
          name="first_name"
        />
        <ControlledInput
          containerClassName={styles.input}
          inputWrapperClassName={styles.inputWrapper}
          label="Фамилия"
          control={control}
          name="last_name"
        />

        <DateWheelPicker
          value={birthDate}
          onChange={(value) => setValue('birth_date', value)}
          inputClassName={styles.dateInput}
        />

        <ControlledToggleButtons
          control={control}
          className={styles.input}
          name="gender"
          label="Пол"
          buttons={[
            { value: 'женщина', children: 'Женский' },
            { value: 'мужчина', children: 'Мужской' },
          ]}
        />

        <PhoneNumberInput
          label="Номер телефона"
          inputWrapperClassName={styles.inputWrapper}
          control={control}
          name="phone_number"
        />
      </div>

      <Button type="submit" className={styles.button} disabled={isPending}>
        Далее
      </Button>

      {isPending && <Loader />}
    </form>
  );
};
