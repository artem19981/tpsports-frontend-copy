'use client';

import React, { FormEvent, useState } from 'react';

import { RecoverPasswordForm } from 'features/Auth';
import { Button } from 'shared/ui/Button/Button';

import styles from './RecoverPassword.module.css';
import { AuthContainer } from '@/src/entities/auth';
import { resetPassword } from 'features/Auth/api';
import { Stack } from '@mui/material';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';
import { Loader, TimerButton, useSnackbar } from 'shared/ui';
import { useMutation } from '@tanstack/react-query';

export const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const sendSnackbar = useSnackbar();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onError: (e) => {
      sendSnackbar('Не удалось сбросить пароль, попробуйте позже', 'error');
    },
    onSuccess: () => {
      setIsShowSuccess(true);
    },
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  if (isShowSuccess) {
    return (
      <Stack className={styles.successBlock}>
        <ActionResult
          title="Инструкции по сбросу пароля отправлены"
          subtitle="Для сброса пароля проверьте и подтвердите свою электронную почту. Проверьте также папку «Спам», если письмо не пришло."
          status={ActionStatus.Success}
          action={
            <TimerButton
              text="Отправить повторно"
              intervalText="Отправить повторно через "
              onClick={() => mutate(email)}
            />
          }
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
