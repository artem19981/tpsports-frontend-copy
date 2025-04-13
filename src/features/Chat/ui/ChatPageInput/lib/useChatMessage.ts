import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getOptimisticUserMessage, getUpdatedGPTMessage } from 'widgets/Chat/lib';
import { ChatDto, ChatVariant, SendMessageDto } from 'features/Chat/model';
import { useSnackbar } from 'shared/ui';
import { sendChatMessage } from 'features/Chat/api/sendMessage';
import { QueryKeys } from 'shared/constants/query-keys';
import { useGetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { NEW_CHAT_ID } from 'entities/chat/config';

export const useChatMessage = (
  chatVariant: ChatVariant,
  setIsGPTMessageLoading: (value: boolean) => void,
  setIsGPTMessageStreaming: (value: boolean) => void,
  onSend?: () => void,
) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();
  const chatId = useGetActiveChatId();

  const [loading, setLoading] = useState(false);

  const optimisticUpdateUserMessage = async (payload: Omit<SendMessageDto, 'bot_name'>) => {
    queryClient.setQueryData([QueryKeys.Chat, chatId || NEW_CHAT_ID], (prevChat: ChatDto) => {
      if (!prevChat) {
        return {
          dialogue_id: NEW_CHAT_ID,
          messages: [getOptimisticUserMessage(payload, chatVariant)],
          messages_limit: 0,
          used_limit: 0,
        };
      }

      return {
        ...prevChat,
        messages: [...prevChat.messages, getOptimisticUserMessage(payload, chatVariant)],
      };
    });
  };

  const updateGPTMessage = async (fullData: string) => {
    queryClient.setQueryData([QueryKeys.Chat, chatId || NEW_CHAT_ID], (prevChat: ChatDto) => {
      return {
        ...prevChat,
        messages: getUpdatedGPTMessage(prevChat.messages, fullData, chatVariant),
      };
    });
  };

  const sendMessage = async (
    payload: Omit<SendMessageDto, 'bot_name' | 'dialogue_id'>,
    botName?: string,
  ) => {
    let intervalId: NodeJS.Timeout | null = null;

    try {
      let fullData = '';

      setLoading(true);
      setIsGPTMessageLoading(true);
      setIsGPTMessageStreaming(true);
      optimisticUpdateUserMessage({
        ...payload,
        dialogue_id: chatId || 0,
      });
      updateGPTMessage('');

      setTimeout(() => {
        // @todo: скролим в конец после добавления сообщений
        onSend?.();
      });

      const { reader, decoder } = await sendChatMessage({
        bot_name: botName || chatVariant,
        ...(chatId && { dialogue_id: chatId }),
        ...payload,
      });

      setIsGPTMessageLoading(false);
      setLoading(false);

      intervalId = setInterval(() => {
        if (fullData) {
          updateGPTMessage(fullData);
        }
      }, 100);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            intervalId && clearInterval(intervalId);
            setIsGPTMessageStreaming(false);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });

          fullData += chunk.split('data:').join('');
        }
      }
    } catch (error) {
      console.error(error);
      showSnackbar('Не удалось получить сообщение', 'error');
      setLoading(false);
      setIsGPTMessageLoading(false);
      setIsGPTMessageStreaming(false);
      intervalId && clearInterval(intervalId);
    }
  };

  return {
    loading,
    sendMessage,
    setLoading,
  };
};
