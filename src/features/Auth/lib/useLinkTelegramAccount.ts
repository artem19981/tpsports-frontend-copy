'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linkTelegramAccount, linkTelegramAccountInMiniApp } from '../api';
import { useSnackbar } from 'shared/ui';
import { handleServerError } from 'shared/api';
import { QueryKeys } from 'shared/constants/query-keys';
import { isTelegramWebApp } from 'shared/lib/isTelegramWebApp';

export const useLinkTelegramAccount = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const isWebApp = isTelegramWebApp();

      return handleServerError(
        isWebApp ? linkTelegramAccountInMiniApp(data) : linkTelegramAccount(data),
      );
    },
    onSuccess: () => {
      snackbar('Ваш Telegram успешно привязан', 'success');

      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    },
    onError: () => {
      snackbar('Не удалось привязать Telegram аккаунт', 'error');
    },
  });
};
