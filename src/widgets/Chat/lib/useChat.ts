import { useGetMessages } from 'features/Chat/lib/useGetMessages';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getSortedChatMessages } from './getSortedChatMessages';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { getLastDialogue } from 'features/Chat/api/getLastDialogue';
import { useSetChatType } from './useSetChatType';
import { usePathname } from 'next/navigation';
import { CHAT_ID_QUERY_PARAM, NEW_CHAT_ID } from 'entities/chat/config';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'shared/constants/query-keys';

export const useChat = (chatId: number | null) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [showSkeletons, setShowSkeletons] = useState(true);

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
        }, 150),
      );
    } else {
      queryClient.setQueryData([QueryKeys.Chat, chatId || NEW_CHAT_ID], () => {
        return null;
      });
    }

    setIsGPTMessageStreaming(false);
    setIsGPTMessageLoading(false);
    scrollToLastMessage(false);
  }, [chatId]);

  const updateChatMessages = useCallback(async () => {
    if (!chatId) {
      setShowSkeletons(false);
      const chat = await getLastDialogue();
      setActiveChatId(chat.dialogue_id);

      setTimeout(() => {
        refetch().then(() => {
          queueMicrotask(() => {
            setShowSkeletons(true);
          });
        });
      });

      const url = new URL(pathname, window.location.origin);
      url.searchParams.set(CHAT_ID_QUERY_PARAM, chat.dialogue_id.toString());
      window.history.replaceState({}, document.title, url.toString());

      return;
    }

    refetch();
  }, [chatId, refetch]);

  const messages = useMemo(() => getSortedChatMessages(data?.messages || []), [data?.messages]);

  return {
    showSkeletons,
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
