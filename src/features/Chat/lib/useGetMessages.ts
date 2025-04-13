import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '../api';
import { ChatDto, ChatVariant } from '../model';
import { NEW_CHAT_ID } from 'entities/chat/config';
import { QueryKeys } from 'shared/constants/query-keys';
import { useChatType } from 'entities/chat/ui';
import { ChatType } from 'entities/chat/model/ChatType';

export const useGetMessages = (chatId: number | null) => {
  const { chatType, setChatType } = useChatType() || {};

  return useQuery<ChatDto, Error>({
    queryKey: [QueryKeys.Chat, chatId || NEW_CHAT_ID],
    queryFn: async () => {
      if (!chatId) {
        return {
          dialogue_id: 'string',
          messages: [],
          bot: chatType as ChatVariant,
        };
      }

      const data = await getChatMessages({
        dialogue_id: chatId!,
      });

      if (data.bot && !chatType) {
        setChatType?.(data.bot as ChatType);
      }

      return data;
    },
    gcTime: 1000 * 60,
    retry: 2,
    enabled: !!chatId,
  });
};
