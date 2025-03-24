import { useGetMessages } from 'features/Chat/lib/useGetMessages';
import { ChatVariant } from 'features/Chat/model';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getSortedChatMessages } from './getSortedChatMessages';

export const useChat = (chatVariant: ChatVariant) => {
  const [isGPTMessageLoading, setIsGPTMessageLoading] = useState(false);
  const [isGPTMessageStreaming, setIsGPTMessageStreaming] = useState(false);

  const { data, refetch, isFetching } = useGetMessages(chatVariant);
  const messagesRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = useCallback((withAnimation = true) => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: withAnimation ? 'smooth' : 'auto',
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (!data) {
      refetch().then(() => setTimeout(() => scrollToLastMessage(false)));
    }

    setIsGPTMessageStreaming(false);
    setIsGPTMessageLoading(false);
    scrollToLastMessage(false);
  }, [chatVariant]);

  const messages = useMemo(
    () => getSortedChatMessages(data?.messages || []),
    [data?.messages]
  );

  return {
    messagesRef,
    isGPTMessageLoading,
    isGPTMessageStreaming,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    scrollToLastMessage,
    refetch,
    hasData: !!data,
    isFetching,
    messages,
  };
};
