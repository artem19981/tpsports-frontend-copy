'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linkTelegramAccount, linkTelegramAccountInMiniApp } from '../api';
import { useSnackbar } from 'shared/ui';
import { handleServerError } from 'shared/api';
import { QueryKeys } from 'shared/constants/query-keys';
import { isTelegramWebApp } from 'shared/lib/isTelegramWebApp';
import { AxiosError } from 'axios';

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
    onError: (e) => {
      const error = e as AxiosError;

      if (error.status === 409) {
        snackbar('Данный Telegram аккаунт уже привязан к другому пользователю', 'error');
        return;
      }

      snackbar('Не удалось привязать Telegram аккаунт', 'error');
    },
  });
};
