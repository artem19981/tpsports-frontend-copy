'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { ChangePasswordForm } from 'features/Auth';
import {
  ChangePasswordPayload,
  ResetPasswordSchema,
  resetPasswordSchema,
} from 'features/Auth/model';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';
import { Button } from 'shared/ui/Button/Button';

import { AuthContainer } from '@/src/entities/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Loader, useSnackbar } from 'shared/ui';

import { changePassword } from 'features/Auth/api';
import { AxiosError } from 'axios';
import { handleServerError } from 'shared/api';
import styles from './ChangePassword.module.css';

interface Props {
  token: string | undefined;
}

export const ChangePassword = ({ token }: Props) => {
  const sendSnackbar = useSnackbar();

  const { data, isPending, mutate } = useMutation({
    mutationFn: (data: ChangePasswordPayload) => handleServerError(changePassword(data)),
    onError: (e) => {
      const error = e as AxiosError;

      if (error.status === 422) {
        sendSnackbar('Ссылка сброса пароля устарела, запросите восстановление заново', 'error');
        return;
      }

      sendSnackbar('Не удалось изменить пароль, попробуйте позже', 'error');
    },
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <div className={styles.success}>
        <ActionResult title="Произошла ошибка, попробуйте позже" status={ActionStatus.Error} />
      </div>
    );
  }

  if (data) {
    return (
      <div className={styles.success}>
        <ActionResult
          title="Ваш пароль был успешно изменен"
          status={ActionStatus.Success}
          action={<Button href="/login">Войти</Button>}
        />
      </div>
    );
  }

  const onSubmit = (form: ResetPasswordSchema) => {
    mutate({ password: form.password, token });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', position: 'relative' }}>
      <AuthContainer
        form={<ChangePasswordForm control={control} />}
        afterForm={
          <div className={styles.footer}>
            <Button type="submit">Изменить пароль</Button>
          </div>
        }
      />
      {isPending && <Loader />}
    </form>
  );
};
