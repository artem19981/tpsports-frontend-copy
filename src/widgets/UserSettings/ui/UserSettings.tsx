'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { useMediaQuery } from '@mui/material';

import styles from './UserSettings.module.scss';
import { FullScreenDialog, MainPageModal } from 'shared/ui';
import { useGetUserProfile } from 'features/User/lib';
import { UserSettingsMenuState } from '../types';
import { UserSettingsActiveForm } from './UserSettingsActiveForm/UserSettingsActiveForm';
import {
  LogoutUserModal,
  UserSettingsBlock,
  UserSettingsMenu,
  UserSettingsMenuItem,
  userSettingsMenuItems,
} from 'entities/user';
import { UserSettingsActions } from 'features/User';

interface Props {
  open?: boolean;
  onClose(): void;
}

export const UserSettings = ({ open, onClose }: Props) => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const isTablet = useMediaQuery('(max-width: 950px)');
  const [activeMenu, setActiveMenu] = useState<UserSettingsMenuState>(
    isMobile ? undefined : UserSettingsMenuItem.PersonalInfo
  );
  const [showExit, setShowExit] = useState(false);

  const { data } = useGetUserProfile();

  const activeMenuIcon = useMemo(
    () => userSettingsMenuItems.find((item) => item.value === activeMenu)?.icon,
    [activeMenu]
  );

  const onSelectMenuItem = useCallback((value: UserSettingsMenuState) => {
    if (value === UserSettingsMenuItem.Exit) {
      setShowExit(true);
    } else {
      setActiveMenu(value);
    }
  }, []);

  return (
    <>
      <MainPageModal onClose={onClose} open={open}>
        <div className={styles.container}>
          <div className={styles.categories}>
            <UserSettingsBlock />
            <UserSettingsMenu
              onClick={onSelectMenuItem}
              activeValue={activeMenu}
            />
          </div>

          {isMobile && activeMenu !== UserSettingsMenuItem.Exit ? (
            <FullScreenDialog
              open={!!activeMenu}
              className={styles.fullScreenDialog}
              onClose={() => setActiveMenu(undefined)}
            >
              <UserSettingsActiveForm
                activeMenu={activeMenu}
                userProfile={data!}
              />
            </FullScreenDialog>
          ) : (
            <UserSettingsActiveForm
              activeMenu={activeMenu}
              userProfile={data!}
            />
          )}

          {!isTablet && (
            <div className={styles.emptyBlock}>{activeMenuIcon}</div>
          )}
        </div>
      </MainPageModal>

      <LogoutUserModal open={showExit} onClose={() => setShowExit(false)}>
        <UserSettingsActions withLoader={!isMobile} />
      </LogoutUserModal>
    </>
  );
};
