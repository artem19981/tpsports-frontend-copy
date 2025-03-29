import React from 'react';

import { MainPageModalMenu } from 'shared/ui';
import { UserSettingsMenuItem } from './types';
import { userSettingsMenuItems } from './config';

interface Props {
  activeValue: UserSettingsMenuItem | undefined;

  onClick(value: UserSettingsMenuItem): void;
}

export const UserSettingsMenu = ({ activeValue, onClick }: Props) => {
  return (
    <MainPageModalMenu
      items={userSettingsMenuItems}
      activeValue={activeValue}
      onClick={onClick}
    />
  );
};
