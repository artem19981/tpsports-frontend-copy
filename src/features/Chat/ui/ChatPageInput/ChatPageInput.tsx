'use client';

import React, { memo } from 'react';
import { ChatInput } from '../ChatInput/ChatInput';

import { ChatVariant } from 'features/Chat/model';
import { useChatMessage } from './lib/useChatMessage';

interface Props {
  chatVariant: ChatVariant;
  isMessageLoading: boolean;

  onSend?: () => void;
  setIsGPTMessageStreaming: (value: boolean) => void;
  setIsGPTMessageLoading: (value: boolean) => void;
}

export const ChatPageInput = memo(
  ({
    chatVariant,
    onSend,
    setIsGPTMessageStreaming,
    setIsGPTMessageLoading,
    isMessageLoading,
  }: Props) => {
    const { sendMessage, setLoading, loading } = useChatMessage(
      chatVariant,
      setIsGPTMessageLoading,
      setIsGPTMessageStreaming,
      onSend
    );

    return (
      <ChatInput
        onSendMessage={sendMessage}
        isPending={loading || isMessageLoading}
        setLoading={setLoading}
      />
    );
  }
);

ChatPageInput.displayName = 'ChatPageInput';
