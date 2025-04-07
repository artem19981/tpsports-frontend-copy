import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleArchiveForChat } from '../api';
import { useSnackbar } from 'shared/ui';
import { QueryKeys } from 'shared/constants/query-keys';
import { handleServerError } from 'shared/api';

export const useToggleArchiveForChat = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  return useMutation({
    mutationFn: (id: number) => handleServerError(toggleArchiveForChat(id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MultiChats] });
    },
    onError: () => {
      showSnackbar('Не удалось удалить чат', 'error');
    },
  });
};
