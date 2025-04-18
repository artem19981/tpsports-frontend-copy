import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { Button, IconButton, TextArea } from 'shared/ui';
import BorderArrow from 'shared/assets/borderArrow.svg?component';

import styles from './OnboardingOtherModal.module.scss';
import classNames from 'classnames';

interface Props extends Omit<DialogProps, 'onSubmit' | 'onClose'> {
  title: string;
  defaultValue: string;
  label: string;

  onClose: () => void;
  onSubmit: (value: string) => void;
}

export const OnboardingOtherModal = ({
  title,
  defaultValue,
  label,
  onSubmit,
  className,
  ...props
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [value, setValue] = useState(defaultValue);

  return (
    <Dialog
      fullScreen={isMobile}
      {...props}
      classes={{ paper: classNames(styles.dialog, className) }}
    >
      <DialogTitle className={styles.header}>
        <IconButton onClick={props.onClose}>
          <BorderArrow />
        </IconButton>
      </DialogTitle>

      <DialogContent className={styles.content}>
        <p className={styles.title}>{title}</p>

        <TextArea
          label={label}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          autoFocus
        />
      </DialogContent>
      <DialogActions className={styles.buttons}>
        <Button onClick={props.onClose} variant="transparent">
          Закрыть
        </Button>
        <Button onClick={() => onSubmit(value)}>Далее</Button>
      </DialogActions>
    </Dialog>
  );
};
