import { MainLayout } from 'app/Layouts';

import { getUserData } from 'features/User/api';
import { redirect } from 'next/navigation';

import classNames from 'classnames';
import styles from './AiPage.module.scss';

import { Stack, Typography } from '@mui/material';
import { MultiChatSelect } from 'features/Chat/ui/ChatsSelect/MultiChatSelect';
import { PageContent } from './PageContent';

import Logo from '@/app/assets/images/aiChat/logo/logo.png';
import Image from 'next/image';

export async function AiPage() {
  const userData = await getUserData().catch(() => {
    redirect('/logout');
  });

  return (
    <MainLayout
      containerClassName={styles.layout}
      contentClassName={styles.content}
      childrenClassName={classNames(styles.children, 'hide-scroll')}
      links={<MultiChatSelect isUserAuthorized={!!userData} />}
    >
      <Stack gap={3.5} alignItems={'center'} className={styles.container}>
        <Typography
          variant="h1"
          sx={{ fontSize: 45, textAlign: 'center', letterSpacing: { sx: '-3px', md: '-3.6px' } }}
        >
          Привет, здесь твоя команда <Image src={Logo} alt="logo" className={styles.logo} />{' '}
          Экспертов.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }} className={styles.suptitle}>
          Мы обеспечим тебя комплексным подходом к достижению целей. Твой успех - наша общая задача.
          Готов к изменениям ? Поехали !
        </Typography>
      </Stack>

      <PageContent userData={userData} />
    </MainLayout>
  );
}
