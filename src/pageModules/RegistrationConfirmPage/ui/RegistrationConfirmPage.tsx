import React from 'react';

import { MainLayout } from 'app/Layouts';
import { Button } from 'shared/ui';
import { ActionResult, ActionStatus } from 'shared/ui/ActionResult';

import { confirmRegistration } from 'features/Auth/api';
import styles from './RegistrationConfirmPage.module.scss';

interface Props {
  token: string;
}

export const RegistrationConfirmPage = async ({ token }: Props) => {
  const isSuccessConfirm = await confirmRegistration(token);

  return (
    <MainLayout
      childrenClassName={styles.content}
      withUserMenu={false}
      headerClassName={styles.header}
    >
      {isSuccessConfirm ? (
        <ActionResult
          title="Вы успешно зарегестрировались"
          status={ActionStatus.Success}
          subtitle="Войдите в аккаунт"
          action={<Button href={'/login'}>Войти</Button>}
        />
      ) : (
        <ActionResult
          title="Не удалось подтвердить почту"
          status={ActionStatus.Error}
          subtitle="Зарегистрируйтесь еще раз"
          action={<Button href={'/registration'}>Зарегистрироваться</Button>}
        />
      )}
    </MainLayout>
  );
};
