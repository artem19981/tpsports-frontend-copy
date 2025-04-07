import { useGetMessages } from 'features/Chat/lib/useGetMessages';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getSortedChatMessages } from './getSortedChatMessages';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { getLastDialogue } from 'features/Chat/api/getLastDialogue';
import { useSetChatType } from './useSetChatType';

export const useChat = (chatId: number | null) => {
  const [isGPTMessageLoading, setIsGPTMessageLoading] = useState(false);
  const [isGPTMessageStreaming, setIsGPTMessageStreaming] = useState(false);

  const { data, refetch, isFetching } = useGetMessages(chatId);
  const setActiveChatId = useSetActiveChatId();
  const messagesRef = useRef<HTMLDivElement>(null);

  useSetChatType(chatId, data?.bot);

  const scrollToLastMessage = useCallback((withAnimation = true) => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: withAnimation ? 'smooth' : 'auto',
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      setActiveChatId(null);
    };
  }, []);

  useLayoutEffect(() => {
    if (chatId) {
      refetch().then(() =>
        setTimeout(() => {
          scrollToLastMessage(false);
        }, 100),
      );
    }

    setIsGPTMessageStreaming(false);
    setIsGPTMessageLoading(false);
    scrollToLastMessage(false);
  }, [chatId]);

  const updateChatMessages = useCallback(async () => {
    if (!chatId) {
      const chat = await getLastDialogue();
      setActiveChatId(chat.dialogue_id);
      queueMicrotask(refetch);

      return;
    }

    refetch();
  }, [chatId, refetch]);

  const messages = useMemo(() => getSortedChatMessages(data?.messages || []), [data?.messages]);

  return {
    messagesRef,
    isGPTMessageLoading,
    isGPTMessageStreaming,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    scrollToLastMessage,
    updateChatMessages,
    hasData: !!data,
    isFetching,
    messages,
  };
};
