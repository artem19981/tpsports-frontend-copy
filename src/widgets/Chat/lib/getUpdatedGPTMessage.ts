import { NEW_GPT_MESSAGE_ID } from 'entities/chat/config';
import { ChatMessageDto, ChatVariant } from 'features/Chat/model';

import { v4 as uuidv4 } from 'uuid';

export const getUpdatedGPTMessage = (
  messages: ChatMessageDto[],
  message: string,
  chatVariant: ChatVariant
): ChatMessageDto[] => {
  const lastMessage = messages[messages.length - 1];
  const isLastMessageGPT = lastMessage?.sender === 'assistant';

  if (isLastMessageGPT) {
    return [
      ...messages.slice(0, messages.length - 1),
      {
        ...lastMessage,
        content: [
          {
            type: 'text',
            text: {
              value: message,
              annotations: [],
            },
          },
        ],
      },
    ] as ChatMessageDto[];
  }

  return [
    ...messages,
    {
      id: NEW_GPT_MESSAGE_ID + uuidv4(),
      sender: 'assistant',
      selected_bot: chatVariant,
      content: [
        {
          type: 'text',
          text: {
            value: message,
            annotations: [],
          },
        },
      ],
      timestamp: new Date().toISOString(),
      rate: 'not rated',
      files: {},
    },
  ] as ChatMessageDto[];
};
