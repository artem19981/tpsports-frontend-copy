'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resendEmailConfirmation } from '../api';
import { useSnackbar } from 'shared/ui';
import { handleServerError } from 'shared/api';
import { QueryKeys } from 'shared/constants/query-keys';

export const useResendEmailConfirmation = (onSuccess?: () => void) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => handleServerError(resendEmailConfirmation(email)),
    onSuccess: () => {
      snackbar('Письмо подтверждения отправлено', 'success');

      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
      onSuccess?.();
    },
    onError: () => {
      snackbar('Не удалось отправить письмо подтверждения, попробуйте позже  ', 'error');
    },
  });
};
