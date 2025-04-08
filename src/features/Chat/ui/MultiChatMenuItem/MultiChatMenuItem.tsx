import React, { KeyboardEvent, SyntheticEvent, TouchEvent, useRef, useState } from 'react';
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
import { COLOR_BY_CHAT_TYPE } from './config';

interface Props extends MultiChatDto {
  isActive: boolean;
  isMobile: boolean;
  isOpen: boolean;

  isMenuOpened: boolean;
  onOpenMenu: React.Dispatch<React.SetStateAction<number | null>>;

  onClose: () => void;
}

export const MultiChatMenuItem = ({
  id,
  isActive,
  isMobile,
  isOpen,
  name,
  bot_name,
  is_favorite,
  isMenuOpened,
  onClose,
  onOpenMenu,
}: Props) => {
  const router = useRouter();

  const [isEditLabelMode, setIsEditLabelMode] = useState(false);
  const [localLabel, setLocalLabel] = useState(name);

  const setActiveChatId = useSetActiveChatId();
  const setChatType = useChatType()?.setChatType;
  const renameChat = useRenameChat(() => setLocalLabel(name));

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const isChatPressed = useRef(false);

  const handleMouseDown = (e: TouchEvent<HTMLLIElement>) => {
    isChatPressed.current = false;

    holdTimeout.current = setTimeout(() => {
      isChatPressed.current = true;
      onOpenMenu(id);

      setTimeout(() => {
        const selection = window.getSelection();
        console.log(selection, 'selection');
        selection?.removeAllRanges();
      }, 200);
    }, 500);
  };

  const onMouseUp = (e: SyntheticEvent) => {
    setTimeout(() => {
      isChatPressed.current = false;
    });

    holdTimeout.current && clearTimeout(holdTimeout.current);
  };

  const onCancelPress = (e: SyntheticEvent) => {
    holdTimeout.current && clearTimeout(holdTimeout.current);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectChat = () => {
    if (isActive || isChatPressed.current || isEditLabelMode) {
      return;
    }

    setActiveChatId(id);
    setChatType?.(bot_name as ChatType);

    if (isMobile) {
      onClose();
    }

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

  const accentColor = COLOR_BY_CHAT_TYPE[bot_name as ChatType];

  return (
    <li
      className={cn(styles.navItem, {
        [styles.active]: isActive,
      })}
      onTouchStart={handleMouseDown}
      onTouchEnd={onMouseUp}
      onTouchCancel={onCancelPress}
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
        className={classNames(styles.input, {
          [styles.label]: isOpen || isMobile,
          [styles.tooltip]: !isOpen && !isMobile,
        })}
        readOnly={!isEditLabelMode}
        inputWrapperClassName={styles.inputWrapper}
      />

      <ChatOptionsMenu
        id={id}
        color={accentColor}
        visibleOnMobile={isActive}
        isChatPressed={isChatPressed}
        open={isMenuOpened}
        onOpenMenu={onOpenMenu}
        renderChildren={() => (
          <MultiChatMenuItemOptions
            chatId={id}
            isFavorite={is_favorite}
            isActive={isActive}
            onClose={() => onOpenMenu(null)}
            onStartRename={onStartRename}
          />
        )}
      />
    </li>
  );
};
