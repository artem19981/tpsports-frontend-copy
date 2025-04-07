export interface SendMessageDto {
  dialogue_id: number;
  bot_name: string;
  content: string;
  files?: string[];
}
