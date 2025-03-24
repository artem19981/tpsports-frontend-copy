import React, { memo } from 'react';
import styles from './AiMessageLoader.module.scss';
import { AiBot } from 'shared/model/aiBot';
import { AnimatedLogo } from 'shared/ui';

interface Props {
  selectedBot: AiBot;
}

export const AiMessageLoader = memo(({ selectedBot }: Props) => {
  return (
    <div>
      <div className={styles.content}>
        <AnimatedLogo
          animation={selectedBot.animation}
          className={styles.loader}
        />

        <div
          className={styles.background}
          style={{ background: selectedBot.messageLoaderBackground }}
        />
      </div>
    </div>
  );
});

AiMessageLoader.displayName = 'AiMessageLoader';
