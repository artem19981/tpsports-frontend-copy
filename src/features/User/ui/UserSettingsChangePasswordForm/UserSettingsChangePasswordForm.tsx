'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import {
  ChangePasswordSchema,
  changePasswordSchema,
} from 'features/User/model';
import { Button, ControlledInput, Loader, useSnackbar } from 'shared/ui';

import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserPassword } from 'features/User/api';
import { useMutation } from '@tanstack/react-query';
import { handleServerError } from 'shared/api';
import { UpdateUserPasswordPayload } from 'features/User/model/UpdateUserPasswordPayload';
import { AxiosError } from 'axios';

const defaultValues = {
  new_password: '',
  old_password: '',
  confirmPassword: '',
};

export const UserSettingsChangePasswordForm = () => {
  const showSnackbar = useSnackbar();

  const { handleSubmit, reset, control, formState } = useForm({
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
      <Stack direction="column" gap={3}>
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

        <Button disabled={!formState.isDirty || isPending} type="submit">
          Изменить пароль
        </Button>
      </Stack>

      {isPending && <Loader />}
    </form>
  );
};
