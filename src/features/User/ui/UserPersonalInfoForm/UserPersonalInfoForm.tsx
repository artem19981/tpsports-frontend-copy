'use client';

import React from 'react';

import { UserProfile } from 'features/User/model';
import { UserPersonalInfoFormFields } from 'entities/user';
import { Loader, useSnackbar, WithAbsoluteScrollBar } from 'shared/ui';

import { useQueryClient } from '@tanstack/react-query';
import { useUserPersonalInfoForm } from './lib';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import styles from './UserPersonalInfoForm.module.scss';

interface Props {
  userProfile: UserProfile;
}

export const UserPersonalInfoForm = ({ userProfile }: Props) => {
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    onSubmit,
    control,
    birthDate,
    setValue,
    isPending,
    isDirty,
  } = useUserPersonalInfoForm({
    userProfile,
    onSuccess: () => {
      showSnackbar('Данные успешно обновлены', 'success');
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <WithAbsoluteScrollBar>
        <div className={styles.content}>
          <p className={styles.title}>Личная информация</p>

          <UserPersonalInfoFormFields
            control={control}
            birthDate={birthDate}
            setValue={setValue}
          />
        </div>
      </WithAbsoluteScrollBar>

      {isPending && <Loader />}

      <MyHealthFormSubmitButton
        type="submit"
        disabled={isPending}
        visible={isDirty}
      />
    </form>
  );
};
