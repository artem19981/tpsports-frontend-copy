import React, { HTMLProps } from 'react';
import cn from 'classnames';
import styles from './MainLayoutContainer.module.scss';

export const MainLayoutContainer = (props: HTMLProps<HTMLDivElement>) => {
  return <div {...props} className={cn(styles.container, props.className)} />;
};
