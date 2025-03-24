import React, { forwardRef } from 'react';
import { Stack, TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import classNames from 'classnames';
import styles from './TextArea.module.scss';
import { Label } from 'shared/ui/Label';

interface Props extends TextareaAutosizeProps {
  label?: string;

  containerClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, containerClassName, ...props }, ref) => {
    return (
      <Stack className={containerClassName}>
        {label && <Label className={styles.label}>{label}</Label>}

        <TextareaAutosize
          minRows={4}
          {...props}
          ref={ref}
          className={classNames(styles.textarea, props.className)}
        />
      </Stack>
    );
  }
);
