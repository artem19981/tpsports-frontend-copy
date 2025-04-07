import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '../api';
import { ChatDto } from '../model';
import { NEW_CHAT_ID } from 'entities/chat/config';
import { QueryKeys } from 'shared/constants/query-keys';

export const useGetMessages = (chatId: number | null) => {
  return useQuery<ChatDto, Error>({
    queryKey: [QueryKeys.Chat, chatId || NEW_CHAT_ID],
    queryFn: async () => {
      if (!chatId) [];

      const data = await getChatMessages({
        dialogue_id: chatId!,
      });

      return data;
    },
    gcTime: 1000 * 60,
    retry: 2,
    enabled: !!chatId,
  });
};
