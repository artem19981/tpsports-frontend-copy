import { NEW_USER_MESSAGE_ID } from 'entities/chat/config';
import {
  ChatMessageDto,
  ChatVariant,
  SendMessageDto,
} from 'features/Chat/model';
import { v4 as uuidv4 } from 'uuid';

export const getOptimisticUserMessage = (
  payload: Omit<SendMessageDto, 'bot_name'>,
  chatVariant: ChatVariant
): ChatMessageDto => {
  return {
    id: NEW_USER_MESSAGE_ID + uuidv4(),
    sender: 'user',
    selected_bot: chatVariant,
    content: [
      {
        type: 'text',
        text: {
          value: payload.content,
          annotations: [],
        },
      },
    ],
    timestamp: new Date().toISOString(),
    rate: 'not rated',
    files: payload.files || [],
  };
};
