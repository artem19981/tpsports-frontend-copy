'use client';

import { assistantByChatVariant } from 'entities/chat/config';
import { useSetOptimisticChatMessage } from 'entities/chat/lib';
import { ChatMessageDto, ChatVariant } from 'features/Chat/model';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from 'shared/ui';
import styles from './RedirectToAnotherChatButton.module.scss';
import { UNBREAKABLE_SEPARATOR } from 'shared/constants/separator';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';

interface Props {
  newChat: ChatVariant;
  message: ChatMessageDto;
}

export const RedirectToAnotherChatButton = ({ newChat, message }: Props) => {
  const pathname = usePathname();

  const setActiveChatId = useSetActiveChatId();
  const setOptimisticChatMessage = useSetOptimisticChatMessage();

  const onClick = () => {
    setActiveChatId(null);
    setOptimisticChatMessage({
      content: message.content[0].text.value,
      files: message.files_ids,
      bot_name: newChat,
    });

    const url = new URL(pathname, window.location.origin);
    window.history.replaceState({}, document.title, url.toString());
  };

  return (
    <Button className={styles.button} variant="transparent" onClick={onClick}>
      Получить ответ в ассистенте {UNBREAKABLE_SEPARATOR}
      <span>{assistantByChatVariant[newChat]}</span>
    </Button>
  );
};
