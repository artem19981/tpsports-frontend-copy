'use client';

import { Stack } from '@mui/material';
import { useChatType } from 'entities/chat/ui';
import { AiPageChatInput } from 'features/Chat/ui/AiPageChatInput/AiPageChatInput';
import { useEffect } from 'react';
import styles from './AiPage.module.scss';

interface PageContentProps {
  userData?: any;
}

export function PageContent({ userData }: PageContentProps) {
  const chatTypeContext = useChatType();

  useEffect(() => {
    if (chatTypeContext?.chatType !== undefined) {
      chatTypeContext?.setChatType(undefined);
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.mainSection}
        style={{
          transition: 'margin-left 0.3s',
          maxWidth: '792px',
        }}
      >
        <Stack mt={{ xs: 0, md: 7 }} gap={4} paddingInline={1} mb={3}>
          {/* <AnimatedChatLogo /> */}
          <AiPageChatInput disabled={!userData} />
          {/* <ChatTabs /> */}
        </Stack>
      </div>
    </div>
  );
}
