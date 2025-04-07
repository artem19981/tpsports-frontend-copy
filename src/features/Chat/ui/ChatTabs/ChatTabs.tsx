'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';

import { useChatType } from 'entities/chat/ui';
import { CategoriesSwipe } from 'features/InitialOnboard/ui/StrengthTrainingForm/components/CategoriesSwipe';
import { useGetAllTags } from 'features/Tags/lib/useGetAllTabs';
import { useGetTagsBy } from 'features/Tags/lib/useGetTagsBy';
import { BOTS } from 'shared/constants/bots';
import { Swiper } from 'shared/ui';
import { SwiperSlide } from 'swiper/react';
import styles from './ChatTabs.module.scss';
import { useSetOptimisticChatMessage } from 'entities/chat/lib';
import { ChatType } from 'entities/chat/model/ChatType';

interface Tag {
  id: string;
  name: string;
  description: string;
  bot_name: string;
  borderColor?: string;
}

interface ChatTabsProps {
  onLocalTagClick?: (tag: Tag) => void;
}

export const ChatTabs = memo(({ onLocalTagClick }: ChatTabsProps) => {
  const router = useRouter();
  const { chatType } = useChatType() || {};
  const { data: allTags } = useGetAllTags();
  const { data: botTags } = useGetTagsBy(chatType);
  const setOptimisticChatMessage = useSetOptimisticChatMessage();

  const tags: Tag[] = chatType ? botTags || [] : allTags || [];

  const getBorderColor = (tag: Tag) => {
    return tag.borderColor || BOTS.find((bot) => bot.name === tag.bot_name)?.borderColor || '#000';
  };

  const handleTagClick = (tag: Tag) => {
    if (chatType && tag.bot_name === chatType) {
      onLocalTagClick && onLocalTagClick(tag);
    } else {
      setOptimisticChatMessage({ content: tag.description, bot_name: tag.bot_name });
      router.push('/ai/chat/');
    }
  };

  return (
    <div className={styles.container}>
      <Swiper withArrows={false}>
        {tags.map((tag) => (
          <SwiperSlide
            key={tag.id}
            style={{
              width: 'auto',
              paddingLeft: 20,
              cursor: 'pointer',
            }}
            onClick={() => handleTagClick(tag)}
          >
            <CategoriesSwipe value={tag.name} height={71} borderColor={getBorderColor(tag)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

ChatTabs.displayName = 'ChatTabs';
