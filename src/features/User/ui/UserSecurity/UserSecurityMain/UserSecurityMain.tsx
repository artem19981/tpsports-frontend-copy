import React from 'react';

import styles from './UserSecurityMain.module.scss';
import { Button, Input } from 'shared/ui';
import { Divider } from '@mui/material';
import { UserSecurityView } from '../types';

interface Props {
  setView: (view: UserSecurityView) => void;
}

export const UserSecurityMain = ({ setView }: Props) => {
  return (
    <div>
      <div className={styles.content}>
        <p className={styles.title}>Безопасность</p>

        <Input label="Электронная почта" name="email" type="email" readOnly />

        <Button
          className={styles.button}
          variant="lightTransparent"
          onClick={() => setView(UserSecurityView.ChangePassword)}
        >
          Изменить пароль
        </Button>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.content}>
        <Input label="Имя пользователя Telegram" name="telegram" type="text" readOnly />
      </div>
    </div>
  );
};
