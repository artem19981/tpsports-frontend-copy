'use client';

import React, { useState } from 'react';
import { ChatInput } from '../ChatInput/ChatInput';
import { useRouter } from 'next/navigation';
import { useChatType } from 'entities/chat/ui';
import { ChatType } from 'entities/chat/model/ChatType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendMessageDto } from 'features/Chat/model';

interface Props {
  disabled: boolean;
}

export const AiPageChatInput = ({ disabled }: Props) => {
  const router = useRouter();
  const chatTypeContext = useChatType();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const chatType = chatTypeContext?.chatType || ChatType.Trainer;

  const mutation = useMutation({
    mutationFn: async (payload: Omit<SendMessageDto, 'bot_name'>) => payload,
    onSuccess: (data) => {
      queryClient.setQueryData(['chatMessage'], data);
      router.push('/ai/chat/' + chatType);
    },
  });

  const onSendMessage = async (payload: Omit<SendMessageDto, 'bot_name'>) => {
    mutation.mutate(payload);
  };

  return (
    <ChatInput
      onSendMessage={onSendMessage}
      isPending={loading}
      disabled={disabled}
      setLoading={setLoading}
    />
  );
};
