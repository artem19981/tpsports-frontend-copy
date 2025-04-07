import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFavoriteForChat } from '../api';
import { useSnackbar } from 'shared/ui';
import { QueryKeys } from 'shared/constants/query-keys';
import { handleServerError } from 'shared/api';

export const useToggleFavoriteForChat = (onError?: () => void) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  return useMutation({
    mutationFn: (id: number) => handleServerError(toggleFavoriteForChat(id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MultiChats] });
    },
    onError: () => {
      onError?.();
      showSnackbar('Не удалось переключить избранное', 'error');
    },
  });
};
