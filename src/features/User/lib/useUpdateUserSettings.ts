import { useMutation } from '@tanstack/react-query';
import { updateUserSettings } from '../api';
import { useSnackbar } from 'shared/ui';
import { UserProfile } from '../model';

interface Props {
  onSuccess?: (data: UserProfile) => void;
  onError?: () => void;
}

export const useUpdateUserSettings = (props?: Props) => {
  const showSnackbar = useSnackbar();

  return useMutation({
    mutationFn: updateUserSettings,
    onError: () => {
      showSnackbar('Не удалось обновить данные, попробуйте позже', 'error');
    },
    ...props,
  });
};
