'use client';

import { assistantByChatVariant } from 'entities/chat/config';
import { useSetOptimisticChatMessage } from 'entities/chat/lib';
import { ChatMessageDto, ChatVariant } from 'features/Chat/model';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'shared/ui';
import styles from './RedirectToAnotherChatButton.module.scss';
import { UNBREAKABLE_SEPARATOR } from 'shared/constants/separator';
import { useChatType } from 'entities/chat/ui';
import { ChatType } from 'entities/chat/model/ChatType';

interface Props {
  newChat: ChatVariant;
  message: ChatMessageDto;
}

export const RedirectToAnotherChatButton = ({ newChat, message }: Props) => {
  const router = useRouter();
  const setOptimisticChatMessage = useSetOptimisticChatMessage();
  const setChatType = useChatType()?.setChatType;

  const onClick = () => {
    setOptimisticChatMessage({
      content: message.content[0].text.value,
      files: message.files,
    });
    setChatType?.(newChat as ChatType);

    router.push('/ai/chat/');
  };

  return (
    <Button className={styles.button} variant="transparent" onClick={onClick}>
      Получить ответ в ассистенте {UNBREAKABLE_SEPARATOR}
      <span>{assistantByChatVariant[newChat]}</span>
    </Button>
  );
};
