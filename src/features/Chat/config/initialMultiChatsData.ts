import { ChatType } from 'entities/chat/model/ChatType';
import { FrontendMultiChat } from '../model';

export const INITIAL_MULTI_CHATS: Record<ChatType, FrontendMultiChat> = {
  [ChatType.Doctor]: {
    allChats: [],
    favoriteChats: [],
  },
  [ChatType.Trainer]: {
    allChats: [],
    favoriteChats: [],
  },
  [ChatType.Nutritionolog]: {
    allChats: [],
    favoriteChats: [],
  },
  [ChatType.Psychologist]: {
    allChats: [],
    favoriteChats: [],
  },
};
