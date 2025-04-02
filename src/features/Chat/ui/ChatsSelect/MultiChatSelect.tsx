"use client";

import { ChatType } from "entities/chat/model/ChatType";
import { useChatType } from "entities/chat/ui";
import { useGetActiveChats } from "features/Chat/lib/useGetActiveChats";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BOTS } from "shared/constants/bots";
import { useSnackbar } from "shared/ui";
import styles from "./MultiChatSelect.module.scss";

interface Props {
  isUserAuthorized: boolean;
  onChange?: (type: ChatType) => void;
}

export const MultiChatSelect: React.FC<Props> = ({
  isUserAuthorized,
  onChange,
}) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const { chatType, setChatType } = useChatType() || {};

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: activeChats,
    isLoading,
    error,
  } = useGetActiveChats(isUserAuthorized);

  const handleSelect = useCallback(
    (type: ChatType) => {
      setIsOpen(false);

      if (isLoading) {
        showSnackbar("Подождите, идет загрузка чатов", "info");
        return;
      }

      if (!activeChats || error) {
        if (isUserAuthorized) {
          showSnackbar("Не удалось загрузить активные чаты", "error");
        }
        onChange?.(type);
        setChatType?.(type);
        return;
      }

      if (onChange) {
        onChange(type);
        return;
      }

      router.push(`/ai/chat/${type}`);
    },
    [
      isLoading,
      error,
      activeChats,
      isUserAuthorized,
      onChange,
      router,
      setChatType,
      showSnackbar,
    ]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedBot = BOTS.find((b) => b.name === chatType);

  return (
    <div className={styles.selectContainer} ref={containerRef}>
      {/* <div className={styles.selectLabel}>Ассистенты</div> */}

      <div className={styles.selectedValue} onClick={toggleOpen}>
        {selectedBot ? selectedBot.translation : "Ассистенты"}
      </div>

      <div className={`${styles.dropdownList} ${isOpen ? styles.open : ""}`}>
        <div className={styles.dropdownTitle} style={{ cursor: "auto" }}>
          Ассистенты
        </div>
        {BOTS.map((bot) => (
          <div
            key={bot.name}
            className={styles.dropdownItem}
            onClick={() => handleSelect(bot.name as ChatType)}
          >
            {bot.translation}
          </div>
        ))}
      </div>
    </div>
  );
};
