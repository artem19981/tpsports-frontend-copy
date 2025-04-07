import { useQueryClient } from '@tanstack/react-query';
import { SendMessageDto } from 'features/Chat/model';

export const useSetOptimisticChatMessage = () => {
  const queryClient = useQueryClient();

  return (data: Omit<SendMessageDto, 'bot_name' | 'dialogue_id'>) =>
    queryClient.setQueryData(['chatMessage'], data);
};
