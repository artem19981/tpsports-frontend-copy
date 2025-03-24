import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '../api';
import { ChatDto, ChatVariant } from '../model';

export const useGetMessages = (
  chatVariant: ChatVariant,
  onSendMessage?: () => void
) => {
  return useQuery<ChatDto, Error>({
    queryKey: [`chat`, chatVariant],
    queryFn: async () => {
      onSendMessage?.();
      const data = await getChatMessages({
        botName: chatVariant,
      });

      return data;
    },
    gcTime: 1000 * 60,
    retry: 2,
  });
};
