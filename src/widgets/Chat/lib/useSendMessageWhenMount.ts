import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatVariant, SendMessageDto } from 'features/Chat/model';
import { useChatMessage } from 'features/Chat/ui/ChatPageInput/lib/useChatMessage';
import { useEffect } from 'react';

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

  const { data } = useQuery<Omit<SendMessageDto, 'bot_name'>>({
    queryKey: ['chatMessage'],
    staleTime: Infinity,
  });

  const { sendMessage, loading } = useChatMessage(
    chatVariant,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    onSend
  );

  useEffect(() => {
    if (data && !isFetching) {
      queueMicrotask(() => {
        sendMessage(data);
        queryClient.setQueryData(['chatMessage'], null);
      });
    }
  }, [isFetching]);

  return {
    isMessageLoading: loading,
  };
};
