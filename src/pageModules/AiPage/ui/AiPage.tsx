import { MainLayout } from "app/Layouts";
import { ChatTypeProvider } from "entities/chat/ui";

import { getUserData } from "features/User/api";
import { redirect } from "next/navigation";

import classNames from "classnames";
import styles from "./AiPage.module.scss";

import { MultiChatSelect } from "features/Chat/ui/ChatsSelect/MultiChatSelect";
import { PageContent } from "./PageContent";

export async function AiPage() {
  const userData = await getUserData().catch(() => {
    redirect("/logout");
  });

  return (
    <ChatTypeProvider>
      <MainLayout
        containerClassName={styles.layout}
        contentClassName={styles.content}
        childrenClassName={classNames(styles.children, "hide-scroll")}
        links={<MultiChatSelect isUserAuthorized={!!userData} />}
      >
        <PageContent userData={userData} />
      </MainLayout>
    </ChatTypeProvider>
  );
}
