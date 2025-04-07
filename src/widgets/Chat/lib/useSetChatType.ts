import { ChatType } from 'entities/chat/model/ChatType';
import { useChatType } from 'entities/chat/ui';
import { ChatVariant } from 'features/Chat/model';
import { useLayoutEffect } from 'react';

export const useSetChatType = (chatId: number | null, bot: ChatVariant | undefined) => {
  const chatVariant = useChatType()?.setChatType;

  useLayoutEffect(() => {
    if (chatId && bot) {
      console.log(chatId, bot);

      chatVariant?.(bot as ChatType);
    }
  }, []);
};
