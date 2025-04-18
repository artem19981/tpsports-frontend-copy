import React from 'react';
import cn from 'classnames';
import styles from './PulsingCircle.module.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  color?: string;
  size?: number;
}

export const PulsingCircle = ({ color = '#00FD44', size = 16, ...props }: Props) => {
  return (
    <span
      {...props}
      className={cn(styles.indicator, props.className)}
      style={{
        backgroundColor: color,
        ['--glow-color' as any]: color,
        width: size,
        height: size,
      }}
    />
  );
};
