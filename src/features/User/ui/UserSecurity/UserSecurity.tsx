'use client';

import React, { useState } from 'react';
import { UserSecurityMain } from './UserSecurityMain/UserSecurityMain';
import { UserSecurityView } from './types';

import styles from './UserSecurity.module.scss';
import { UserSettingsChangePasswordForm } from './UserSettingsChangePasswordForm/UserSettingsChangePasswordForm';
import { useMediaQuery } from '@mui/material';
import { FullScreenDialog } from 'shared/ui';
import { UserProfile } from 'features/User/model';
import { UserSecurityAddEmail } from './UserSecurityAddEmail/UserSecurityAddEmail';

interface Props {
  userProfile: UserProfile;
  setActiveMenu: React.Dispatch<React.SetStateAction<any>>;
}

export const UserSecurity = ({ userProfile, setActiveMenu }: Props) => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  const [view, setView] = useState<string>(UserSecurityView.Main);

  const Content = (
    <div className={styles.container}>
      {view === UserSecurityView.Main && (
        <UserSecurityMain userProfile={userProfile} setView={setView} />
      )}
      {view === UserSecurityView.ChangePassword && (
        <UserSettingsChangePasswordForm onClose={() => setView(UserSecurityView.Main)} />
      )}
      {view === UserSecurityView.AddEmail && (
        <UserSecurityAddEmail onClose={() => setView(UserSecurityView.Main)} />
      )}
    </div>
  );

  if (!isMobile) {
    return Content;
  }

  const onClose = () => {
    switch (view) {
      case UserSecurityView.Main:
        return setActiveMenu(undefined);
      case UserSecurityView.ChangePassword: {
        setView(UserSecurityView.Main);
      }
      case UserSecurityView.AddEmail: {
        setView(UserSecurityView.Main);
      }
    }
  };

  return (
    <FullScreenDialog open className={styles.fullScreenDialog} onClose={onClose}>
      {Content}
    </FullScreenDialog>
  );
};
