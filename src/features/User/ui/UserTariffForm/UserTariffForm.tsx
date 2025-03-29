'use client';
import React from 'react';

import { Button } from 'shared/ui';
import styles from './UserTariffForm.module.scss';
// import { DeleteTariffUserModal } from './DeleteTariffUserModal/DeleteTariffUserModal';
import { useRouter } from 'next/navigation';
import { UserTariff } from 'features/User/model';

interface Props {
  tariff: UserTariff;
}

export const UserTariffForm = ({ tariff }: Props) => {
  const router = useRouter();
  console.log(tariff);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Мой тариф</p>
      <p className={styles.text}>
        Вы подписаны на тариф <span className={styles.bold}>{tariff.name}</span>
      </p>
      <Button
        variant="transparent"
        className={styles.button}
        onClick={() => router.push('/tariff')}
      >
        Изменить Тариф
      </Button>
      {/* <Button
        variant="transparent"
        className={styles.button}
        onClick={() => setShowModal(true)}
      >
        Отменить Подписку
      </Button>
      <DeleteTariffUserModal
        open={showModal}
        onClose={() => setShowModal(false)}
      /> */}
    </div>
  );
};
