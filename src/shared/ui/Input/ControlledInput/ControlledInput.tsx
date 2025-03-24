'use client';

import React, { FC } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Input, InputProps } from '../Input';

export interface ControlledInputProps<T extends FieldValues>
  extends InputProps {
  control: Control<T>;
  name: Path<T>;
}

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...props}
          {...field}
          onBlur={(e) => {
            field.onBlur();
            props.onBlur?.(e);
          }}
          errorMessage={error?.message}
        />
      )}
    />
  );
};
