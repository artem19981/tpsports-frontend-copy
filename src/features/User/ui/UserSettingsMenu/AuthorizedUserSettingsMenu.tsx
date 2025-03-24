'use client';

import React, { useMemo, useState } from 'react';

import { Divider, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useGetUserProfile } from '../../lib';
import styles from './UserSettingsMenu.module.css';
import ProfileImg from '@/app/assets/images/aiChat/menu/menu-profile.svg?component';
import { getUserInitials } from './lib/getUserInitials';
import { getMenuItems } from './UserSettingsMenu.config';
import { useRouter } from 'next/navigation';
import { useLogoutUser } from 'features/Auth/lib';
import { logoutUser as onLogout } from 'features/Auth/api';
import { MyHealth } from 'widgets/MyHealth';

interface Props {
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

export const AuthorizedUserSettingsMenu = ({
  setAnchorEl,
  anchorEl,
  handleClose,
}: Props) => {
  const [showHealth, setShowHealth] = useState(false);
  const router = useRouter();

  const logoutUser = useLogoutUser(onLogout, () => {
    router.push('/ai');
  });

  const getProfile = useGetUserProfile();
  const menuItems = useMemo(
    () => getMenuItems(logout, router, openMyHealth),
    []
  );

  function logout() {
    logoutUser.mutate();
    handleClose();
  }

  function openMyHealth() {
    setShowHealth(true);
    handleClose();
  }

  const isUserHasInitials =
    getProfile?.data?.first_name || getProfile?.data?.last_name;

  return (
    <div>
      {isUserHasInitials ? (
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className={styles.userInitials}
          size="medium"
        >
          <p>{getUserInitials(getProfile?.data)}</p>
        </IconButton>
      ) : (
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          size="medium"
          style={{ opacity: 0.3 }}
        >
          <ProfileImg />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: styles.menu, list: styles.menuList }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.label}>
            {idx === menuItems.length - 1 && (
              <Divider className={styles.divider} />
            )}

            <div className={styles.menuItemWrapper}>
              <MenuItem
                onClick={item.onClick || handleClose}
                className={styles.menuItem}
              >
                <ListItemIcon className={styles.menuItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText className={styles.menuItemText}>
                  {item.label}
                </ListItemText>
              </MenuItem>
            </div>
          </React.Fragment>
        ))}
      </Menu>

      {showHealth && <MyHealth onClose={() => setShowHealth(false)} />}
    </div>
  );
};
