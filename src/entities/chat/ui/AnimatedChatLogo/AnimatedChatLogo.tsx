"use client";

import { useChatType } from "entities/chat/ui";
import { memo, useMemo } from "react";
import { BOTS } from "shared/constants/bots";

import { AnimatedLogo } from "shared/ui";
import styles from "./AnimatedChatLogo.module.scss";

export const AnimatedChatLogo = memo(() => {
  const chatTypeContext = useChatType();

  const chatType = chatTypeContext?.chatType;

  const selectedBot = useMemo(
    () => BOTS.find((bot) => bot.name === chatType),
    [chatType]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "fit-content",
      }}
    >
      <AnimatedLogo
        animation={selectedBot?.animation}
        className={styles.logo}
      />
    </div>
  );
});

AnimatedChatLogo.displayName = "AnimatedChatLogo";
