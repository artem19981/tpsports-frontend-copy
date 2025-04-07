import React, { KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './MultiChatMenuItem.module.scss';
import { ChatOptionsMenu } from 'entities/chat/ui/ChatOptionsMenu/ChatOptionsMenu';
import { MultiChatMenuItemOptions } from './MultiChatMenuItemOptions';
import classNames from 'classnames';
import { Input } from 'shared/ui';
import { MultiChatDto } from 'features/Chat/model';
import { useRenameChat } from 'features/Chat/lib/useRenameChat';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { useRouter } from 'next/navigation';
import { useChatType } from 'entities/chat/ui';
import { ChatType } from 'entities/chat/model/ChatType';
import { CHAT_ID_QUERY_PARAM } from 'entities/chat/config';

interface Props extends MultiChatDto {
  isActive: boolean;
  isMobile: boolean;
  isOpen: boolean;
  accentColor: string;
}

export const MultiChatMenuItem = ({
  id,
  isActive,
  isMobile,
  isOpen,
  name,
  accentColor,
  bot_name,

  is_favorite,
}: Props) => {
  const router = useRouter();

  const [isEditLabelMode, setIsEditLabelMode] = useState(false);
  const [localLabel, setLocalLabel] = useState(name);

  const setActiveChatId = useSetActiveChatId();
  const setChatType = useChatType()?.setChatType;
  const renameChat = useRenameChat(() => setLocalLabel(name));

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectChat = () => {
    if (isActive) {
      return;
    }

    setActiveChatId(id);
    setChatType?.(bot_name as ChatType);

    router.push(`/ai/chat/?${CHAT_ID_QUERY_PARAM}=${id}`);
  };

  const onStartRename = () => {
    setIsEditLabelMode(true);

    queueMicrotask(() => {
      if (inputRef.current) {
        const input = inputRef.current;
        const length = input.value.length;

        input.focus();
        input.setSelectionRange(length, length);
        input.scrollLeft = input.scrollWidth;
      }
    });
  };

  const onSaveChatName = () => {
    renameChat.mutate({ id, new_name: localLabel });
    setIsEditLabelMode(false);
  };

  const onKeyDownLabel = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditLabelMode(false);
      setLocalLabel(name);
    }

    if (event.key === 'Enter') {
      onSaveChatName();
    }
  };

  return (
    <li
      className={cn(styles.navItem, {
        [styles.active]: isActive,
      })}
      onClick={onSelectChat}
      style={{
        borderBottom: isOpen || isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : '',
        ...(isActive && {
          borderLeft: `2px solid ${accentColor}`,
        }),
      }}
    >
      <Input
        value={localLabel}
        onChange={(e) => setLocalLabel(e.target.value)}
        onBlur={onSaveChatName}
        onKeyDown={onKeyDownLabel}
        ref={inputRef}
        className={classNames({
          [styles.label]: isOpen || isMobile,
          [styles.tooltip]: !isOpen && !isMobile,
        })}
        readOnly={!isEditLabelMode}
        inputWrapperClassName={styles.inputWrapper}
      />

      <ChatOptionsMenu
        color={accentColor}
        renderChildren={(onClose) => (
          <MultiChatMenuItemOptions
            chatId={id}
            isFavorite={is_favorite}
            isActive={isActive}
            onClose={onClose}
            onStartRename={onStartRename}
          />
        )}
      />
    </li>
  );
};
