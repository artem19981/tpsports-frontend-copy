import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload } from '../model';
import { useSnackbar } from 'shared/ui';
import { useRouter } from 'next/navigation';
import { login } from '../api';
import { AxiosError } from 'axios';
import { handleServerError } from 'shared/api';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginPayload) => handleServerError(login(data)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (!data.isOnboardingCompleted) {
        router.replace('/initial-onboard?step=' + InitialOnboardStep.Initial);
      } else {
        router.replace('/ai');
      }
    },
    onError: (e) => {
      const error = e as AxiosError;

      if (error.status === 401) {
        showSnackbar('Неправильный логин или пароль', 'error');
        return;
      }

      showSnackbar('Не удалось авторизоваться, попробуйте позже', 'error');
    },
  });
};
