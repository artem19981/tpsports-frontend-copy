'use client';

import React from 'react';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
} from '@mui/material';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import classNames from 'classnames';
import { Label } from '../Label';
import styles from './ToggleButtons.module.scss';

interface Props<T extends FieldValues> {
  onChange: (value: PathValue<T, Path<T>>) => void;
  value: PathValue<T, Path<T>>;

  buttons: ToggleButtonProps[];
  label?: string;
  labelFromLeft?: boolean;
  activeButtonBackground?: string;

  className?: string;
}

export const ToggleButtons = <T extends FieldValues>({
  buttons,
  label,
  onChange,
  value,
  labelFromLeft,
  activeButtonBackground,
  className,
}: Props<T>) => {
  return (
    <Stack
      className={classNames(styles.container, className, {
        [styles.labelFromLeft]: labelFromLeft,
      })}
    >
      {label && (
        <Label
          asLabel
          className={classNames(styles.label, {
            [styles.labelFromLeft]: labelFromLeft,
          })}
        >
          {label}
        </Label>
      )}

      <ToggleButtonGroup
        value={value}
        className={styles.buttons}
        exclusive
        onChange={(_, newValue) => {
          if (newValue !== null) {
            onChange(newValue);
          }
        }}
      >
        {buttons.map((button, idx) => (
          <ToggleButton
            {...button}
            key={idx}
            style={{
              ...(activeButtonBackground &&
                value === button.value && {
                  background: activeButtonBackground,
                }),
            }}
            className={classNames(styles.button, button.className, {
              [styles.active]: value === button.value,
            })}
          />
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};
