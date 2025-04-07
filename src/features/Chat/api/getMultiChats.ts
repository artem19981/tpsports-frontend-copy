'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { FrontendMultiChat, MultiChatDto } from '../model';
import { ChatType } from 'entities/chat/model/ChatType';
import cloneDeep from 'lodash/cloneDeep';
import { INITIAL_MULTI_CHATS } from '../config/initialMultiChatsData';

export const getMultiChats = async () => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance<MultiChatDto[]>('/dialogues', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );

  return mapToFrontendInterface(data);
};

function mapToFrontendInterface(chats: MultiChatDto[]) {
  const chatsByAssistants: Record<ChatType, FrontendMultiChat> = cloneDeep(INITIAL_MULTI_CHATS);

  const allChats: FrontendMultiChat = {
    allChats: [],
    favoriteChats: [],
  };

  chats.forEach((chat) => {
    if (chat.is_archived) {
      return;
    }

    if (chat.is_favorite) {
      chatsByAssistants[chat.bot_name].favoriteChats.push(chat);
      allChats.favoriteChats.push(chat);

      return;
    }

    chatsByAssistants[chat.bot_name].allChats.push(chat);
    allChats.allChats.push(chat);
  });

  return {
    chats: allChats,
    chatsByAssistants,
  };
}
