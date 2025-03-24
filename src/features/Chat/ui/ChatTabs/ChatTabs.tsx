'use client';

import React, { memo, useMemo } from 'react';

import { useChatType } from 'entities/chat/ui';
import { BOTS } from 'shared/constants/bots';

import styles from './ChatTabs.module.scss';

export const ChatTabs = memo(({}: any) => {
  const chatType = useChatType()?.chatType;
  const selectedBot = useMemo(
    () => BOTS.find((bot) => bot.name === chatType),
    [chatType]
  );

  const defaultQuestion = [
    {
      bot: {
        name: 'psychologist',
        translation: 'психолог',
      },
      text: 'Стресс',
      borderColor: '#ED4A06',
      message: 'Как правильно справляться со стрессом?',
    },
    {
      bot: {
        name: 'nutritionolog',
        translation: 'нутрициолог',
      },
      text: 'Здоровое питание',
      borderColor: '#0173FF',
      message: 'Как создать свой идеальный рацион здорового питания?',
    },
    {
      bot: {
        name: 'medic',
        translation: 'доктор',
      },
      text: 'Реабилитация',
      borderColor: '#FFF9F7',
      message: 'Как правильно спланировать реабилитацию после травмы?',
    },
    {
      bot: {
        name: 'coach',
        translation: 'тренер',
      },
      text: 'Фитнес-цели',
      borderColor: '#AEBD0C',
      message: 'Как мне поставить фитнес-цели?',
    },
  ];

  const questions = selectedBot?.questions || defaultQuestion;

  return (
    <div className={styles.container}>
      {questions.map((question: any) => (
        <p
          key={question.text}
          onClick={() => {
            // askFastQuestion(question.message, selectedBot);
          }}
          className={styles.tab}
          style={{
            borderColor: selectedBot?.borderColor || question?.borderColor,
            fontSize: 13,
          }}
        >
          {question.text}
        </p>
      ))}
    </div>
  );
});

ChatTabs.displayName = 'ChatTabs';
