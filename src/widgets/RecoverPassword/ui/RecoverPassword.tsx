'use client';

import React, { FormEvent, useState } from 'react';

import { RecoverPasswordForm } from 'features/Auth';
import { Button } from 'shared/ui/Button/Button';

import styles from './RecoverPassword.module.css';
import { AuthContainer } from '@/src/entities/auth';
import { resetPassword } from 'features/Auth/api';
import { Stack } from '@mui/material';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';
import { Loader, useSnackbar } from 'shared/ui';
import { useMutation } from '@tanstack/react-query';

export const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const sendSnackbar = useSnackbar();

  const { mutate, data, isPending } = useMutation({
    mutationFn: resetPassword,
    onError: (e) => {
      sendSnackbar('Не удалось сбросить пароль, попробуйте позже', 'error');
    },
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  if (data) {
    return (
      <Stack className={styles.successBlock}>
        <ActionResult
          title="Инструкции по сбросу пароля отправлены"
          subtitle="Проверьте свою электоронную почту"
          status={ActionStatus.Success}
        />
      </Stack>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <AuthContainer
        form={
          <RecoverPasswordForm
            inputProps={{
              onChange: (e) => setEmail(e.target.value),
              value: email,
              type: 'email',
            }}
          />
        }
        afterForm={
          <div className={styles.footer}>
            <Button type="submit">Отправить письмо для сброса</Button>

            {isPending && <Loader />}
          </div>
        }
      />
    </form>
  );
};
