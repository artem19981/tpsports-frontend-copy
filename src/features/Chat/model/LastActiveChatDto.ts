import { ChatVariant } from './ChatVariant';

export interface LastActiveChatDto {
  dialogue_id: number;
  bot_name: ChatVariant;
  dialogue_name: string;
  is_favorite: boolean;
}
