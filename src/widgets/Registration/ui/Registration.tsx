'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { RegistrationForm } from 'features/Auth/ui/RegistrationForm/RegistrationForm';
import { loginSchema } from 'features/Auth/model';
import { useRegistrationUser } from 'features/Auth/lib';
import { LoginPayload } from 'features/Auth/model';
import { useRouter } from 'next/navigation';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';
import { Button } from 'shared/ui/Button/Button';

import styles from './Registration.module.scss';
import { AuthContainer } from '@/src/entities/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Loader } from 'shared/ui';
import { TelegramAuthForm } from 'features/Auth';

export const Registration = () => {
  const router = useRouter();

  const { isPending, mutate, isSuccess } = useRegistrationUser();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (form: LoginPayload) => {
    mutate(form);
  };

  const goToLogin = () => {
    router.push('/login');
  };

  if (isSuccess) {
    return (
      <Stack className={styles.successBlock}>
        <ActionResult
          title="Вы успешно зарегестрировались"
          subtitle="Для входа проверьте и подтвердите свою электронную почту"
          status={ActionStatus.Success}
        />
      </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <AuthContainer
        className={styles.form}
        contentClassName={styles.content}
        form={<RegistrationForm control={control} />}
        afterForm={
          <div className={styles.footer}>
            <Button type="submit" disabled={isPending || isSuccess}>
              Создать аккаунт
            </Button>

            <div className={styles.footerContent}>
              <p className={styles.footerText}>
                Уже есть аккаунт?{' '}
                <span onClick={goToLogin} className={styles.recover}>
                  Войти
                </span>
              </p>
            </div>

            <TelegramAuthForm />

            {isPending && <Loader />}
          </div>
        }
      />

      <div className={styles.afterForm}>
        <p className={styles.agreement}>
          Нажимая на кнопку Создать аккаунт, я соглашаюсь с{' '}
          <span>Политикой конфиденциальности</span> и с <span>Пользовательским соглашением.</span>
        </p>
      </div>
    </form>
  );
};
