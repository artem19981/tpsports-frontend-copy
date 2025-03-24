import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './ButtonsGroup.module.scss';
import { Button, ButtonProps } from '@mui/material';

interface Props extends Omit<ButtonProps, 'onClick'> {
  value: string;
  isActive: boolean;
  label?: ReactNode;

  onClick(value: string): void;
}

export const ToggleButton = ({
  isActive,
  onClick,
  value,
  label,
  onMouseDown,
  ...props
}: Props) => {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(value)}
      {...props}
      className={classNames(styles.button, props.className, {
        [styles.active]: isActive,
      })}
    >
      {label || value}
    </Button>
  );
};
