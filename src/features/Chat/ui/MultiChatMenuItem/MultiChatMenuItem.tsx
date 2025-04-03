import React, { KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './MultiChatMenuItem.module.scss';
import { ChatOptionsMenu } from 'entities/chat/ui/ChatOptionsMenu/ChatOptionsMenu';
import { MultiChatMenuItemOptions } from './MultiChatMenuItemOptions';
import classNames from 'classnames';
import { Input } from 'shared/ui';

interface Props {
  isActive: boolean;
  isMobile: boolean;
  isOpen: boolean;
  label: string;
  accentColor: string;

  isFavorite: boolean;
}

export const MultiChatMenuItem = ({
  isActive,
  isMobile,
  isOpen,
  label,
  accentColor,

  isFavorite,
}: Props) => {
  const [isEditLabelMode, setIsEditLabelMode] = useState(false);
  const [localLabel, setLocalLabel] = useState(label);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectChat = () => {
    console.log('onSelectChat');
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
    console.log('onSaveChatName');

    setIsEditLabelMode(false);
  };

  const onKeyDownLabel = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditLabelMode(false);
      setLocalLabel(label);
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
        disabled={!isEditLabelMode}
        onBlur={onSaveChatName}
        onKeyDown={onKeyDownLabel}
        ref={inputRef}
        className={classNames({
          [styles.label]: isOpen || isMobile,
          [styles.tooltip]: !isOpen && !isMobile,
        })}
        inputWrapperClassName={styles.inputWrapper}
      />

      <ChatOptionsMenu
        color={accentColor}
        renderChildren={(onClose) => (
          <MultiChatMenuItemOptions isFavorite={isFavorite} assistantColor={accentColor} onClose={onClose} onStartRename={onStartRename} />
        )}
      />
    </li>
  );
};
