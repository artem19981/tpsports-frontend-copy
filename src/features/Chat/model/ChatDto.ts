export interface ChatDto {
  dialogue_id: string;
  messages: ChatMessageDto[];
  messages_limit: number;
  used_limit: number;
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
  timestamp: string;
  rate: 'like' | 'dislike' | 'not rated';
  files: string[];
}
