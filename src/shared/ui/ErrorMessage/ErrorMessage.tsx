import React, { FC, memo } from 'react';

import cn from 'classnames';

import styles from './errorMessage.module.css';

interface Props {
  message: string;
  className?: string;
}

export const ErrorMessage: FC<Props> = memo(({ message, className }) => {
  return <p className={cn(styles.text, className)}>{message}</p>;
});

ErrorMessage.displayName = 'ErrorMessage';
