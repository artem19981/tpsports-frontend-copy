import { ChatVariant } from 'features/Chat/model';
import { ChatType } from './model/ChatType';

export const NEW_GPT_MESSAGE_ID = 'new_gpt_message_id';
export const NEW_USER_MESSAGE_ID = 'NEW_USER_MESSAGE_ID';
export const NEW_CHAT_ID = 'NEW_NEW_CHAT_ID';
export const CHAT_ID_QUERY_PARAM = 'chatId';

export const assistantByChatVariant: Record<ChatVariant, string> = {
  [ChatType.Trainer]: 'Спорт',
  [ChatType.Doctor]: 'Здоровье',
  [ChatType.Nutritionolog]: 'Питание',
  [ChatType.Psychologist]: 'Сознание',
};
