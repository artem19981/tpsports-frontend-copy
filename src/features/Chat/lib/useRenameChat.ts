import { useMutation, useQueryClient } from '@tanstack/react-query';
import { renameChat } from '../api';
import { useSnackbar } from 'shared/ui';
import { QueryKeys } from 'shared/constants/query-keys';
import { RenameChatPayload } from '../model';
import { handleServerError } from 'shared/api';

export const useRenameChat = (onError: () => void) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  return useMutation({
    mutationFn: (data: RenameChatPayload) => handleServerError(renameChat(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MultiChats] });
    },
    onError: () => {
      onError();
      showSnackbar('Не удалось переименовать чат', 'error');
    },
  });
};
