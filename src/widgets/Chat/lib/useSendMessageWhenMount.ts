import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatType } from 'entities/chat/model/ChatType';
import { useChatType } from 'entities/chat/ui';
import { ChatVariant, SendMessageDto } from 'features/Chat/model';
import { useChatMessage } from 'features/Chat/ui/ChatPageInput/lib/useChatMessage';
import { useEffect } from 'react';
import { QueryKeys } from 'shared/constants/query-keys';

interface Props {
  chatVariant: ChatVariant;
  isFetching: boolean;
  setIsGPTMessageLoading: (value: boolean) => void;
  setIsGPTMessageStreaming: (value: boolean) => void;
  onSend?: () => void;
}

export const useSendMessageWhenMount = ({
  chatVariant,
  isFetching,
  setIsGPTMessageLoading,
  setIsGPTMessageStreaming,
  onSend,
}: Props) => {
  const queryClient = useQueryClient();
  const chatTypeContext = useChatType();

  const { data } = useQuery<SendMessageDto>({
    queryKey: [QueryKeys.ChatMessage],
    staleTime: Infinity,
  });

  const { sendMessage, loading } = useChatMessage(
    chatVariant,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    onSend,
  );

  useEffect(() => {
    if (data && !isFetching) {
      queueMicrotask(() => {
        const { bot_name, ...other } = data;

        sendMessage(other, bot_name);
        chatTypeContext?.setChatType(bot_name as ChatType);
        queryClient.setQueryData(['chatMessage'], null);
      });
    }
  }, [isFetching, data]);

  return {
    isMessageLoading: loading,
  };
};
