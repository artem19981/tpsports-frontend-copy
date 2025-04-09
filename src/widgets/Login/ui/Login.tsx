'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginForm } from 'features/Auth';
import { LoginFormSchema, loginSchema } from 'features/Auth/model';
import { useLoginUser } from 'features/Auth/lib';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/ui/Button/Button';

import { AuthContainer } from '@/src/entities/auth';
import { yupResolver } from '@hookform/resolvers/yup';

import { Loader } from 'shared/ui';

import styles from './Login.module.css';
import { TelegramLogin2 } from './TelegramButtonForAuth2';

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
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <AuthContainer
        form={<LoginForm control={control} />}
        afterForm={
          <div className={styles.footer}>
            <Button type="submit" disabled={isPending || isSuccess}>
              Войти
            </Button>

            <TelegramLogin2 />

            <div className={styles.footerContent}>
              <p className="greyP14" onClick={goToRecover}>
                Забыли пароль?
              </p>
              <p className="greyP14" onClick={goToRegister}>
                &nbsp;| Создать аккаунт
              </p>
            </div>

            {isPending && <Loader />}
          </div>
        }
      />
    </form>
  );
};
