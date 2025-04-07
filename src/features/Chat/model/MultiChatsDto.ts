import { ChatMessageDto } from './ChatDto';
import { ChatVariant } from './ChatVariant';

export interface FrontendMultiChat {
  allChats: MultiChatDto[];
  favoriteChats: MultiChatDto[];
}

export interface MultiChatDto {
  id: number;
  bot_name: ChatVariant;
  name: string;
  is_favorite: boolean;
  is_archived: boolean;
  last_message: ChatMessageDto['content'];
  last_message_time: '2025-04-06T07:36:23.335992';
}

export interface MultiChatsDto {
  chats: MultiChatDto[];
}
