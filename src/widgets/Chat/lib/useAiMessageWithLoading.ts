import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_AI_MESSAGE_HEIGHT } from '../config/defaultMessageheight';
import { AI_MESSAGE_LOADER_HEIGHT } from '../config/AiMessageLoaderHeight';
import { ChatVariant } from 'features/Chat/model';

export const useAiMessageWithLoading = (
  messagesRef: RefObject<HTMLDivElement>,
  chatVariant: ChatVariant,
  scrollToLastMessage: () => void
) => {
  const [animateText, setAnimateText] = useState(false);
  const [lastGPTMessageHeight, setLastGPTMessageHeight] = useState(
    DEFAULT_AI_MESSAGE_HEIGHT
  );
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastGPTMessageHeight(DEFAULT_AI_MESSAGE_HEIGHT);
    setAnimateText(false);
  }, [chatVariant]);

  const onSendMessage = useCallback(() => {
    if (!lastUserMessageRef.current || !messagesRef.current) {
      return;
    }

    const blockHeight = messagesRef.current.offsetHeight;
    const userMessageHeight = lastUserMessageRef.current.offsetHeight;
    const GPTMessageHeight =
      blockHeight - userMessageHeight - AI_MESSAGE_LOADER_HEIGHT;

    setLastGPTMessageHeight(`${GPTMessageHeight}px`);
    setAnimateText(true);

    setTimeout(scrollToLastMessage);
  }, []);

  return {
    lastGPTMessageHeight,
    lastUserMessageRef,
    animateText,
    onSendMessage,
    setAnimateText,
  };
};
