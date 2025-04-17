'use client';

import React, { ReactNode } from 'react';

import { Dialog as _Dialog, DialogActions, DialogContent, DialogProps } from '@mui/material';
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
            Отмена
          </Button>
        )}
        <Button onClick={onSubmit}>Далее</Button>
      </DialogActions>
    );

  return (
    <_Dialog
      {...dialogProps}
      open={open}
      onClose={onClose}
      classes={{ paper: classNames(styles.dialog, className), container: styles.dialogContainer }}
    >
      <DialogContent className={classNames(styles.content, contentClassName)}>
        <div className={styles.children}>
          <p className={styles.title}>{title}</p>
          {dialogProps.children}
        </div>
      </DialogContent>
      {Footer}
    </_Dialog>
  );
};
