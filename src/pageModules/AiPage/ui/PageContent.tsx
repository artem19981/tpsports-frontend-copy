"use client";

import { useState } from "react";

import { Stack } from "@mui/material";
import { AnimatedChatLogo } from "entities/chat/ui";
import { ChatTabs } from "features/Chat/ui";
import { AiPageChatInput } from "features/Chat/ui/AiPageChatInput/AiPageChatInput";

import styles from "./AiPage.module.scss";

interface PageContentProps {
  userData?: any;
}

export function PageContent({ userData }: PageContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.mainSection}
        style={{
          transition: "margin-left 0.3s",
          maxWidth: "768px",
        }}
      >
        <Stack mt={7} gap={4} paddingInline={1} mb={3}>
          <AnimatedChatLogo />
          <AiPageChatInput disabled={!userData} />
          <ChatTabs />
        </Stack>
      </div>
    </div>
  );
}
