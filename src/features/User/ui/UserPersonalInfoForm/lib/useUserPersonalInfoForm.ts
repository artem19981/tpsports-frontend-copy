'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Gender, UserSettingsSchema, userSettingsSchema } from 'entities/user';

import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserSettings } from 'features/User/lib';
import { UserProfile } from 'features/User/model';
import isEqual from 'lodash/isEqual';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useUserPersonalInfoForm = ({ userProfile, onSuccess }: Props) => {
  const defaultValues = useMemo(
    () => ({
      first_name: userProfile.first_name || '',
      last_name: userProfile.last_name || '',
      phone_number: userProfile.phone_number || '',
      birth_date: userProfile.birth_date || '',
      gender: userProfile.gender || Gender.Female,
      email: userProfile.email,
    }),
    []
  );

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    control,
    formState,
  } = useForm({
    defaultValues,
    resolver: yupResolver(userSettingsSchema),
  });

  const { isPending, mutate } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());
      onSuccess();
    },
  });

  const onSubmit = (form: UserSettingsSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);

    const gender = form.gender as UserProfile['gender'];

    if (isChanged) {
      mutate({
        ...userProfile,
        ...form,
        gender,
        ...(gender === Gender.Male && {
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
      onSuccess();
    }
  };

  const birthDate = watch('birth_date');

  return {
    handleSubmit,
    onSubmit,
    control,
    birthDate,
    setValue,
    isPending,
    isDirty: formState.isDirty,
  };
};
