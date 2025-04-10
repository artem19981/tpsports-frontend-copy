'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginForm, TelegramAuthForm } from 'features/Auth';
import { LoginFormSchema, loginSchema } from 'features/Auth/model';
import { useLoginUser } from 'features/Auth/lib';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/ui/Button/Button';

import { AuthContainer } from '@/src/entities/auth';
import { yupResolver } from '@hookform/resolvers/yup';

import { Loader } from 'shared/ui';

import styles from './Login.module.scss';

export const Login = () => {
  const router = useRouter();

  const { isPending, isSuccess, mutate } = useLoginUser();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (form: LoginFormSchema) => {
    mutate(form);
  };

  const goToRegister = () => {
    router.push('/registration');
  };

  const goToRecover = () => {
    router.push('/recover-password');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: '100%', overflow: 'auto' }}
      className="hide-scroll"
    >
      <AuthContainer
        form={<LoginForm control={control} />}
        afterForm={
          <div className={styles.footer}>
            <Button type="submit" disabled={isPending || isSuccess}>
              Войти
            </Button>

            <div className={styles.footerContent}>
              <p className={styles.recover} onClick={goToRecover}>
                Забыли пароль?
              </p>

              <p className={styles.recoverDivider}>&nbsp;|</p>

              <p className={styles.recover} onClick={goToRegister}>
                Создать аккаунт
              </p>
            </div>

            <TelegramAuthForm />

            {isPending && <Loader />}
          </div>
        }
      />
    </form>
  );
};
