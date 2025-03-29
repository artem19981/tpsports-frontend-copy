'use client';

import React, { memo, ReactNode } from 'react';
import { UserProfile } from 'features/User/model';

import styles from './UserSettingsActiveForm.module.scss';
import { UserSettingsMenuState } from '../../types';
import { UserSettingsMenuItem } from 'entities/user';
import {
  UserPersonalInfoForm,
  UserSettingsChangePasswordForm,
  UserTariffForm,
} from 'features/User';

interface Props {
  activeMenu: UserSettingsMenuState;
  userProfile: UserProfile;
}

export const UserSettingsActiveForm = memo(
  ({ activeMenu, userProfile }: Props) => {
    const componentByStep: Record<string, ReactNode> = {
      [UserSettingsMenuItem.PersonalInfo]: (
        <UserPersonalInfoForm userProfile={userProfile} />
      ),
      [UserSettingsMenuItem.ChangePassword]: <UserSettingsChangePasswordForm />,
      [UserSettingsMenuItem.PricingPlan]: (
        <UserTariffForm tariff={userProfile.tariff} />
      ),
    };

    if (!activeMenu) {
      return;
    }

    return (
      <div className={styles.container}>{componentByStep[activeMenu]}</div>
    );
  }
);

UserSettingsActiveForm.displayName = 'UserSettingsActiveForm';
