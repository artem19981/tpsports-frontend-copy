'use client';

import React, { memo, useMemo } from 'react';
import { useChatType } from 'entities/chat/ui';
import { BOTS } from 'shared/constants/bots';

import styles from './AnimatedChatLogo.module.scss';
import { AnimatedLogo } from 'shared/ui';

export const AnimatedChatLogo = memo(() => {
  const chatTypeContext = useChatType();

  const chatType = chatTypeContext?.chatType;

  const selectedBot = useMemo(
    () => BOTS.find((bot) => bot.name === chatType),
    [chatType]
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: 'fit-content',
        }}
      >
        <AnimatedLogo
          animation={selectedBot?.animation}
          className={styles.logo}
        />
      </div>

      <p className={styles.text}>
        {selectedBot?.welcomeText ||
          'Привет! Мы твои ИИ ассистенты в спорте, здоровье и мотивации! Твой успех - наша цель. Готов к переменам? Давай начнём!'}
      </p>
    </div>
  );
});

AnimatedChatLogo.displayName = 'AnimatedChatLogo';
