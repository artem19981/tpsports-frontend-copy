'use client';

import { MutationFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { linkTelegramAccount, linkTelegramAccountInMiniApp } from '../api';
import { useSnackbar } from 'shared/ui';
import { handleServerError } from 'shared/api';
import { QueryKeys } from 'shared/constants/query-keys';

export const useLinkTelegramAccount = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const isWebApp = typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe;

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
