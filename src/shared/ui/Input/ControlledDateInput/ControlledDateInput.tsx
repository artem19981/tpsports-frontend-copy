'use client';

import React, { ReactNode, RefObject, useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { InputProps } from '../Input';
import { ErrorMessage } from 'shared/ui/ErrorMessage';

import styles from './ControlledDateInput.module.scss';
import classNames from 'classnames';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Button, Stack } from '@mui/material';
import { format, isValid } from 'date-fns';
import { Label } from 'shared/ui/Label';

export interface ControlledDateInputProps<T extends FieldValues>
  extends InputProps {
  control: Control<T>;
  name: Path<T>;

  label: string;
  containerClassName?: string;
  inputWrapperClassName?: string;
  renderAfterInput?: (ref: RefObject<HTMLInputElement>) => ReactNode;
}

export const ControlledDateInput = <T extends FieldValues>({
  control,
  name,
  label,
  containerClassName,
  inputWrapperClassName,
  renderAfterInput,
}: ControlledDateInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const innerRef = useRef<HTMLInputElement>(null);
        const dateFormat = 'dd.MM.yyyy';

        const value = new Date(field.value);

        return (
          <div className={classNames(styles.container, containerClassName)}>
            <Label className={styles.label}>{label}</Label>

            <div className={styles.datePickerWrapper}>
              <MobileDatePicker
                {...field}
                className={classNames(
                  styles.inputWrapper,
                  inputWrapperClassName
                )}
                inputRef={innerRef}
                slots={{
                  actionBar: (props) => {
                    return (
                      <Stack
                        direction="row"
                        justifyContent={'flex-end'}
                        gap={2}
                        style={{ gridColumn: ' 1 / 4', gridRow: 3 }}
                        padding={1}
                      >
                        <Button
                          onClick={() => {
                            props.onCancel();

                            setTimeout(() => {
                              if (!innerRef.current) {
                                return;
                              }

                              innerRef.current.selectionStart = 0;
                              innerRef.current.selectionEnd = 0;
                            }, 50);
                          }}
                        >
                          Отменить
                        </Button>
                        <Button
                          onClick={() => {
                            props.onAccept();

                            setTimeout(() => {
                              if (!innerRef.current) {
                                return;
                              }

                              innerRef.current.selectionStart = 0;
                              innerRef.current.selectionEnd = 0;
                            }, 50);
                          }}
                        >
                          Ок
                        </Button>
                      </Stack>
                    );
                  },
                }}
                slotProps={{
                  textField: {
                    InputProps: {
                      readOnly: true,
                      value: isValid(value) ? format(value, dateFormat) : '',
                      placeholder: ' ',
                    },
                  },
                  toolbar: {
                    hidden: true,
                  },
                }}
                maxDate={new Date()}
                minDate={new Date('1900-01-01')}
              />

              {renderAfterInput?.(innerRef)}
            </div>

            {error?.message && (
              <ErrorMessage message={error.message} className={styles.error} />
            )}
          </div>
        );
      }}
    />
  );
};
