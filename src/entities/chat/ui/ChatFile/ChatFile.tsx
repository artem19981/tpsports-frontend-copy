import React, { memo } from 'react';

import { IconButton } from '@mui/material';
import fileSrc from './assets/file.png';
import crossSrc from './assets/cross.png';
import Image from 'next/image';

import styles from './ChatFile.module.scss';
import { availableFileTypes } from './config';
import classNames from 'classnames';

interface Props {
  onClick?: () => void;
  name: string;
  extension: string | undefined;
  className?: string;
}

export const ChatFile = memo(
  ({ onClick, name, extension, className }: Props) => {
    const fileTypeName = extension
      ? availableFileTypes[extension]
      : 'Unknown Format';

    const _name = name.split('.').slice(0, -1).join('.');

    return (
      <div className={classNames(styles.file, className)}>
        <div className={styles.imageWrapper}>
          <Image src={fileSrc} width={16} height={20} alt="file" />
        </div>

        <div className={styles.content}>
          <p className={styles.title} title={_name}>
            {_name}
          </p>
          <p className={styles.subtitle}>{fileTypeName}</p>
        </div>

        {onClick && (
          <IconButton className={styles.cross} onClick={onClick} size="small">
            <Image src={crossSrc} width={15} height={15} alt="close" />
          </IconButton>
        )}
      </div>
    );
  }
);

ChatFile.displayName = 'ChatFile';
