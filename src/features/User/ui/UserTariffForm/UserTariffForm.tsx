'use client';
import React from 'react';

import { Button } from 'shared/ui';
import styles from './UserTariffForm.module.scss';
// import { DeleteTariffUserModal } from './DeleteTariffUserModal/DeleteTariffUserModal';
import { UserTariff } from 'features/User/model';

interface Props {
  tariff: UserTariff;

  onOpenTariff: (open: boolean) => void;
}

export const UserTariffForm = ({ tariff, onOpenTariff }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Мой тариф</p>
      <p className={styles.text}>
        Вы подписаны на тариф <span className={styles.bold}>{tariff.tariff}</span>
      </p>
      <Button
        variant="lightTransparent"
        className={styles.button}
        onClick={() => onOpenTariff(true)}
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
