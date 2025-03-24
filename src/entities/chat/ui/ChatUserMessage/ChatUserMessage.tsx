'use client';

import React, { memo, RefObject } from 'react';

import { ChatMessageDto } from 'features/Chat/model';
import styles from './ChatUserMessage.module.scss';
import { UploadedFiles } from '../UploadedFiles/UploadedFiles';

interface Props {
  message: ChatMessageDto;
  innerRef: RefObject<HTMLDivElement> | undefined;
}

export const ChatUserMessage = memo(({ message, innerRef }: Props) => {
  return (
    <div className={styles.container} ref={innerRef}>
      <div className={styles.content}>
        <UploadedFiles
          fileNames={message.files}
          containerClassName={styles.files}
          fileClassName={styles.file}
        />
        <div className={styles.text}>{message.content[0].text.value}</div>
      </div>
    </div>
  );
});

ChatUserMessage.displayName = 'ChatUserMessage';
