'use client';

import React, { useState } from 'react';

import { IconButton } from '@mui/material';

import { useRouter } from 'next/navigation';

import { useGetUser } from '../../lib';
import ProfileImg from '@/app/assets/images/aiChat/menu/menu-profile.svg?component';
import { AuthorizedUserSettingsMenu } from './AuthorizedUserSettingsMenu';

export const UserSettingsMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getUser = useGetUser();

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!getUser.data) {
    return (
      <IconButton onClick={() => router.push('/login')} size="medium">
        <ProfileImg color="#fff" />
      </IconButton>
    );
  }

  return (
    <AuthorizedUserSettingsMenu
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      handleClose={handleClose}
    />
  );
};
