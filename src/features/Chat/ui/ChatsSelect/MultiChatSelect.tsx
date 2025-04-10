'use client';

import { ChatType } from 'entities/chat/model/ChatType';
import { useChatType } from 'entities/chat/ui';
import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { useGetMultiChats } from 'features/Chat/lib/useGetMultiChats';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BOTS } from 'shared/constants/bots';
import { useSnackbar } from 'shared/ui';
import styles from './MultiChatSelect.module.scss';

interface Props {
  isUserAuthorized: boolean;
  onChange?: (type: ChatType) => void;
}

export const MultiChatSelect: React.FC<Props> = ({ isUserAuthorized, onChange }) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const { chatType, setChatType } = useChatType() || {};

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setActiveChatId = useSetActiveChatId();
  const { data: multiChats, isLoading } = useGetMultiChats();

  const selectedBot = BOTS.find((b) => b.name === chatType);
  const selectedBorderColor = selectedBot ? selectedBot.borderColor : '#ccc';

  const options = BOTS.filter((bot) => {
    if (!chatType && bot.translation === 'Ассистенты') return false;
    return true;
  }).sort((a, b) => {
    if (a.name === chatType) return -1;
    if (b.name === chatType) return 1;
    return 0;
  });

  const handleSelect = useCallback(
    (type: ChatType) => {
      setIsOpen(false);

      if (isLoading) {
        showSnackbar('Подождите, идет загрузка чатов', 'info');
        return;
      }

      if (onChange) {
        onChange(type);
        return;
      }

      const hasSomeChats =
        multiChats.chatsByAssistants[type].allChats.length > 0 ||
        multiChats.chatsByAssistants[type].favoriteChats.length > 0;

      setActiveChatId(null);
      router.push(`/ai/chat`);
      setChatType?.(type);
    },
    [isLoading, multiChats, onChange, router, setChatType, setActiveChatId, showSnackbar],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${styles.selectContainer} ${isOpen ? styles.open : ''}`} ref={containerRef}>
      <div
        className={styles.selectedValue}
        onClick={toggleOpen}
        style={{
          backgroundColor: selectedBot ? selectedBot.background : '#112A18',
        }}
      >
        <span
          className={styles.itemIndicator}
          style={{
            backgroundColor: selectedBot?.borderColor || '#00FD44',
            boxShadow: `0px 0px 25px 0px ${selectedBot?.borderColor || '#00FD44'}`,
          }}
        />
        {selectedBot ? selectedBot.translation : 'Ассистенты'}
      </div>

      <div
        className={`${styles.dropdownList} ${isOpen ? styles.open : ''}`}
        style={{
          backgroundColor: selectedBot ? selectedBot.background : '#112A18',
        }}
      >
        {options.map((bot) => {
          const isActive = bot.name === chatType;
          const botBorderColor = bot.borderColor || '#00FD44';

          return (
            <div
              key={bot.name}
              className={`${styles.dropdownItem} ${isActive ? styles.activeItem : ''}`}
              onClick={() => handleSelect(bot.name as ChatType)}
            >
              {isActive && (
                <span
                  className={styles.itemIndicator}
                  style={{
                    backgroundColor: botBorderColor,
                    boxShadow: `0px 0px 25px 0px ${botBorderColor}`,
                  }}
                />
              )}
              {bot.translation}
              {/* {isActive && <span className={styles.activeBadge}></span>} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
