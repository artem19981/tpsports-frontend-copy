import React from 'react';

import styles from './UserSecurityMain.module.scss';
import { Button, Input, TimerButton } from 'shared/ui';
import { Divider } from '@mui/material';
import { UserSecurityView } from '../types';
import { UserProfile } from 'features/User/model';
import Telegram from '@/app/assets/images/common/telegram.svg?component';
import {
  getTelegramAccountData,
  useLinkTelegramAccount,
  useResendEmailConfirmation,
} from 'features/Auth/lib';

interface Props {
  userProfile: UserProfile;
  setView: (view: UserSecurityView) => void;
}

export const UserSecurityMain = ({ userProfile, setView }: Props) => {
  const { mutate: linkTelegramAccount, isPending } = useLinkTelegramAccount();
  const { mutate: resendEmailConfirmation, isPending: isResendingEmail } =
    useResendEmailConfirmation();

  const linkTgAccount = async () => {
    const tgAccountData = await getTelegramAccountData();
    linkTelegramAccount(tgAccountData);
  };

  const isEmailConfirmed = userProfile.tariff.email_confirmed;
  const email = userProfile.email;

  return (
    <div>
      <div className={styles.content}>
        <p className={styles.title}>Безопасность</p>

        {email && (
          <>
            <Input
              label="Электронная почта"
              name="email"
              type="email"
              readOnly
              className={styles.input}
              value={email}
            />

            {!isEmailConfirmed && (
              <p className={styles.emailNotConfirmed}>
                Электронная почта не подтверждена. Для завершения проверьте и подтвердите свою
                электронную почту. Проверьте также папку “Спам”, если письмо не пришло.
              </p>
            )}

            {isEmailConfirmed ? (
              <Button
                className={styles.button}
                variant="lightTransparent"
                onClick={() => setView(UserSecurityView.ChangePassword)}
              >
                Изменить пароль
              </Button>
            ) : (
              <TimerButton
                text=" Отправить письмо подтверждения"
                intervalText="Отправить повторно через "
                disabled={isResendingEmail}
                isUseTimerAtMount={false}
                className={styles.button}
                variant="lightTransparent"
                onClick={() => resendEmailConfirmation(email)}
              />
            )}
          </>
        )}

        {!email && (
          <>
            <Input
              label="Имя пользователя Telegram"
              name="telegram"
              type="text"
              readOnly
              className={styles.input}
              value={userProfile.tariff.telegram_id!}
            />

            <Button
              className={styles.button}
              onClick={() => setView(UserSecurityView.AddEmail)}
              disabled={isPending}
              variant="lightTransparent"
            >
              Привязать электронную почту
            </Button>
          </>
        )}
      </div>

      {email && <Divider className={styles.divider} />}

      {email && (
        <div className={styles.content}>
          {userProfile.tariff.telegram_id ? (
            <Input
              label="Имя пользователя Telegram"
              name="telegram"
              type="text"
              readOnly
              className={styles.input}
              value={userProfile.tariff.telegram_id}
            />
          ) : (
            <Button
              onClick={linkTgAccount}
              disabled={isPending}
              variant="lightTransparent"
              startIcon={<Telegram width={24} height={24} />}
            >
              Привязать Telegram
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
