import { UserDto } from '../../User/model';
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { sendChatMessage } from '../api';

export const useSendChatMessage = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      onSuccess();
    },
  });
};
