import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  getOptimisticUserMessage,
  getUpdatedGPTMessage,
} from 'widgets/Chat/lib';
import { ChatDto, ChatVariant, SendMessageDto } from 'features/Chat/model';
import { useSnackbar } from 'shared/ui';
import { sendChatMessage } from 'features/Chat/api/sendMessage';

export const useChatMessage = (
  chatVariant: ChatVariant,
  setIsGPTMessageLoading: (value: boolean) => void,
  setIsGPTMessageStreaming: (value: boolean) => void,
  onSend?: () => void
) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  const [loading, setLoading] = useState(false);

  const optimisticUpdateUserMessage = async (
    payload: Omit<SendMessageDto, 'bot_name'>
  ) => {
    queryClient.setQueryData(['chat', chatVariant], (prevChat: any) => {
      return {
        ...prevChat,
        messages: [
          ...prevChat.messages,
          getOptimisticUserMessage(payload, chatVariant),
        ],
      };
    });
  };

  const updateGPTMessage = async (fullData: string) => {
    queryClient.setQueryData(['chat', chatVariant], (prevChat: ChatDto) => {
      return {
        ...prevChat,
        messages: getUpdatedGPTMessage(
          prevChat.messages,
          fullData,
          chatVariant
        ),
      };
    });
  };

  const sendMessage = async (payload: Omit<SendMessageDto, 'bot_name'>) => {
    let intervalId: NodeJS.Timeout | null = null;

    const startTime = performance.now();

    try {
      let fullData = '';

      setLoading(true);
      setIsGPTMessageLoading(true);
      setIsGPTMessageStreaming(true);
      optimisticUpdateUserMessage(payload);
      updateGPTMessage('');

      setTimeout(() => {
        // @todo: скролим в конец после добавления сообщений
        onSend?.();
      });

      const { reader, decoder } = await sendChatMessage({
        bot_name: chatVariant,
        ...payload,
      });

      const endTime = performance.now();
      console.log(
        `Время ответа от сервера: ${(endTime - startTime).toFixed(2)} мс`
      );

      setIsGPTMessageLoading(false);
      setLoading(false);

      intervalId = setInterval(() => {
        const endTime = performance.now();

        console.log(
          `получил больше текста ${(endTime - startTime).toFixed(2)} мс`
        );

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
