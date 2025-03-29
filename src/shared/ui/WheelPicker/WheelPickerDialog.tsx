'use client';

import React, { ReactNode } from 'react';

import {
  Dialog as _Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from '@mui/material';
import styles from './WheelPicker.module.scss';
import classNames from 'classnames';
import { Button } from '../Button/Button';

interface Props extends Omit<DialogProps, 'title'> {
  title: ReactNode;
  footer?: ReactNode;
  open: boolean;
  withCancelButton?: boolean;

  contentClassName?: string;

  onClose: () => void;
  onSubmit?: () => void;
}

export const WheelPickerDialog = ({
  title,
  footer,
  open,
  withCancelButton = true,
  contentClassName,
  className,
  onClose,
  onSubmit,
  ...dialogProps
}: Props) => {
  const Footer =
    footer !== undefined ? (
      footer
    ) : (
      <DialogActions className={styles.actions}>
        {withCancelButton && (
          <Button className={styles.cancel} onClick={onClose}>
            отмена
          </Button>
        )}
        <Button onClick={onSubmit}>далее</Button>
      </DialogActions>
    );

  return (
    <_Dialog
      {...dialogProps}
      open={open}
      onClose={onClose}
      classes={{ paper: classNames(styles.dialog, className) }}
    >
      <DialogContent className={classNames(styles.content, contentClassName)}>
        <p className={styles.title}>{title}</p>
        {dialogProps.children}
      </DialogContent>
      {Footer}
    </_Dialog>
  );
};
