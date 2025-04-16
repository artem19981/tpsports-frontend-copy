'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { RegistrationForm } from 'features/Auth/ui/RegistrationForm/RegistrationForm';
import { useRegistrationUser, useResendEmailConfirmation } from 'features/Auth/lib';
import { LoginPayload } from 'features/Auth/model';
import { useRouter } from 'next/navigation';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';
import { Button } from 'shared/ui/Button/Button';

import styles from './Registration.module.scss';
import { AuthContainer } from '@/src/entities/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Loader, TimerButton } from 'shared/ui';
import { TelegramAuthForm } from 'features/Auth';
import { registerSchema } from 'features/Auth/model/schemas/registerSchema';

export const Registration = () => {
  const router = useRouter();

  const { isPending, mutate, isSuccess } = useRegistrationUser();
  const { mutate: resendEmailConfirmation, isPending: isResendingEmail } =
    useResendEmailConfirmation();

  const { handleSubmit, watch, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (form: LoginPayload) => {
    mutate({
      email: form.email,
      password: form.password,
    });
  };

  const goToLogin = () => {
    router.push('/login');
  };

  const email = watch('email');

  if (isSuccess) {
    return (
      <Stack className={styles.successBlock}>
        <ActionResult
          title="Вы успешно зарегестрировались"
          subtitle="Для входа проверьте и подтвердите свою электронную почту. Проверьте также папку «Спам», если письмо не пришло."
          status={ActionStatus.Success}
          action={
            <TimerButton
              text="Отправить повторно"
              intervalText="Отправить повторно через "
              onClick={() => resendEmailConfirmation(email)}
            />
          }
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
