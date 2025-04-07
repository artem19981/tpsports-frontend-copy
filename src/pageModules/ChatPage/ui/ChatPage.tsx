import { MainLayout } from 'app/Layouts';
import { MultiChatSelect } from 'features/Chat/ui/ChatsSelect/MultiChatSelect';
import { Chat } from 'widgets/Chat';
import styles from './ChatPage.module.scss';

export const ChatPage = () => {
  return (
    <MainLayout
      containerClassName={styles.layoutContainer}
      contentClassName={styles.content}
      links={<MultiChatSelect isUserAuthorized />}
    >
      <Chat />
    </MainLayout>
  );
};
