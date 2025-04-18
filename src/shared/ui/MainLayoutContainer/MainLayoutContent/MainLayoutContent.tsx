import React, { forwardRef, HTMLProps } from 'react';
import cn from 'classnames';
import styles from './MainLayoutContent.module.scss';

export const MainLayoutContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    return <div {...props} className={cn(styles.content, props.className)} ref={ref} />;
  },
);
