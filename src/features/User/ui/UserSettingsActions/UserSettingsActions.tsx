'use client';

import React from 'react';

import { Stack } from '@mui/material';

import { useLogoutUser } from 'features/Auth/lib/useLogoutUser';
import { useRouter } from 'next/navigation';
import { Button, Loader } from 'shared/ui';
import { logoutUser as onLogout, logoutUserFromAllDevices } from 'features/Auth/api';

import { revalidatePath } from 'next/cache';
import { useQueryClient } from '@tanstack/react-query';
import { ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY } from 'features/Chat/config/activeChatIdLocalStorageKey';

interface Props {
  withLoader?: boolean;
}

export const UserSettingsActions = ({ withLoader = true }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutUser = useLogoutUser(onLogout, afterLogout);
  const logoutFromAllDevices = useLogoutUser(logoutUserFromAllDevices, afterLogout);

  function afterLogout() {
    localStorage.removeItem(ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY);
    queryClient.clear();
    router.push('/ai');
    revalidatePath('/');
  }

  const disableLogouts =
    logoutUser.isPending ||
    logoutFromAllDevices.isPending ||
    logoutUser.isSuccess ||
    logoutFromAllDevices.isSuccess;

  return (
    <Stack direction="column" gap={1.9} width="100%">
      <Button onClick={() => logoutUser.mutate()} disabled={disableLogouts}>
        Выход
      </Button>

      <Button
        variant="transparent"
        onClick={() => logoutFromAllDevices.mutate()}
        disabled={disableLogouts}
      >
        Выйти со всех устройств
      </Button>

      {disableLogouts && withLoader && <Loader />}
    </Stack>
  );
};
