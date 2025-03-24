import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'shared/ui';
import { registration } from '../api';
import { RegistrationPayload } from '../model';
import { handleServerError } from 'shared/api';
import { AxiosError } from 'axios';

export const useRegistrationUser = () => {
  const queryClient = useQueryClient();
  const sendSnackbar = useSnackbar();

  return useMutation({
    mutationFn: (data: RegistrationPayload) =>
      handleServerError(registration(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration'] });
    },
    onError: (e) => {
      const error = e as AxiosError;

      if (error.status === 400) {
        sendSnackbar(
          'Пользователь с данным email уже зарегистрирован',
          'error'
        );
        return;
      }

      sendSnackbar('Не удалось зарегистрироваться, попробуйте позже', 'error');
    },
  });
};
