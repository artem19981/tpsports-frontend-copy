'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { linkEmailAddress } from '../api';
import { useSnackbar } from 'shared/ui';
import { handleServerError } from 'shared/api';
import { QueryKeys } from 'shared/constants/query-keys';
import { AxiosError } from 'axios';

export const useLinkEmailAddress = (onSuccess?: () => void) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => handleServerError(linkEmailAddress(email)),
    onSuccess: () => {
      snackbar('Ваша электронная почта успешно привязана', 'success');

      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
      onSuccess?.();
    },
    onError: (e) => {
      const error = e as AxiosError;

      if (error?.status === 404 || error?.status === 409) {
        snackbar('Данная почта уже привязана', 'error');
      } else {
        snackbar('Не удалось привязать почту, попробуйте позже  ', 'error');
      }
    },
  });
};
