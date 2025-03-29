'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { ChangePasswordSchema, changePasswordSchema } from 'entities/user';
import { ControlledInput, Loader, useSnackbar } from 'shared/ui';

import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserPassword } from 'features/User/api';
import { useMutation } from '@tanstack/react-query';
import { handleServerError } from 'shared/api';
import { UpdateUserPasswordPayload } from 'features/User/model/UpdateUserPasswordPayload';
import { AxiosError } from 'axios';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import styles from './UserSettingsChangePasswordForm.module.scss';

const defaultValues = {
  new_password: '',
  old_password: '',
  confirmPassword: '',
};

export const UserSettingsChangePasswordForm = () => {
  const showSnackbar = useSnackbar();

  const { handleSubmit, reset, watch, control } = useForm({
    defaultValues,
    resolver: yupResolver(changePasswordSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: UpdateUserPasswordPayload) =>
      handleServerError(updateUserPassword(data)),
    onSuccess: () => {
      reset(defaultValues);
      showSnackbar('Пароль успешно изменен', 'success');
    },
    onError: (e) => {
      const error = e as AxiosError;

      if (error.status === 401) {
        showSnackbar('Текущий пароль неверен, попробуйте снова.', 'error');
        return;
      }

      showSnackbar('Не удалось изменить пароль, попробуйте снова.', 'error');
    },
  });

  const onSubmit = (form: ChangePasswordSchema) => {
    mutate(form);
  };

  const form = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Stack paddingInline={2.5} className={styles.content}>
        <p className={styles.title}>Изменить пароль</p>

        <Stack direction="column" gap={3} className={styles.content}>
          <ControlledInput
            name="old_password"
            type="password"
            control={control}
            label="Текущий пароль"
          />
          <ControlledInput
            name="new_password"
            type="password"
            control={control}
            label="Новый пароль"
          />
          <ControlledInput
            name="confirmPassword"
            type="password"
            control={control}
            label="Подтвердить новый пароль"
          />
        </Stack>
      </Stack>

      <MyHealthFormSubmitButton
        type="submit"
        disabled={isPending}
        visible={
          !!form.confirmPassword && !!form.new_password && !!form.old_password
        }
      />

      {isPending && <Loader />}
    </form>
  );
};
