import { AnimatedChatLogo, ChatTypeProvider } from 'entities/chat/ui';
import { MainLayout } from 'app/Layouts';
import { ChatsList, ChatTabs } from 'features/Chat/ui';

import { Stack } from '@mui/material';

import styles from './AiPage.module.scss';
import { AiPageChatInput } from 'features/Chat/ui/AiPageChatInput/AiPageChatInput';
import { getUserData } from 'features/User/api';
import { redirect } from 'next/navigation';
import classNames from 'classnames';

export async function AiPage() {
  const userData = await getUserData().catch(() => {
    redirect('/logout');
  });

  return (
    <ChatTypeProvider>
      <MainLayout
        containerClassName={styles.layout}
        contentClassName={styles.content}
        childrenClassName={classNames(styles.children, 'hide-scroll')}
        links={<ChatsList isUserAuthorized={!!userData} />}
      >
        <Stack mt={7} gap={4} paddingInline={1} mb={3}>
          <AnimatedChatLogo />
          <AiPageChatInput disabled={!userData} />

          <ChatTabs />
        </Stack>
      </MainLayout>
    </ChatTypeProvider>
  );
}
