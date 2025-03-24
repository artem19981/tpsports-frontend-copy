'use client';

import React from 'react';
import { ToggleButtonProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ToggleButtons } from './ToggleButtons';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;

  buttons: ToggleButtonProps[];
  label?: string;
  labelFromLeft?: boolean;
  className?: string;
}

export const ControlledToggleButtons = <T extends FieldValues>({
  buttons,
  label,
  control,
  name,
  labelFromLeft,
  className,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ToggleButtons
          onChange={field.onChange}
          value={field.value}
          buttons={buttons}
          className={className}
          labelFromLeft={labelFromLeft}
          label={label}
        />
      )}
    />
  );
};
