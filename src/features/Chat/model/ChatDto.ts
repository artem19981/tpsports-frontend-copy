import { ChatVariant } from './ChatVariant';

export interface ChatDto {
  dialogue_id: string;
  messages: ChatMessageDto[];
  bot: ChatVariant;
}

export interface ChatMessageDto {
  id: string;
  sender: 'assistant' | 'user';
  selected_bot: string;
  content: [
    {
      type: string;
      text: {
        value: string;
        annotations: [];
      };
    },
  ];
  redirect?: {
    bot: ChatVariant;
  };
  timestamp: string;
  rate: 'like' | 'dislike' | 'not rated';
  files: string[];
  files_ids: string[];
}
