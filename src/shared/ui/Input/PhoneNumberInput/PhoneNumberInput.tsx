'use client';
import React, { ReactNode, RefObject, useId, useRef } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { InputProps } from '../Input';
import classNames from 'classnames';
import styles from './PhoneNumberInput.module.scss';
import { ErrorMessage } from 'shared/ui/ErrorMessage';
import { useCombinedRef } from 'shared/lib';
import { CountrySelectWithIcon } from './CuntrySelect/CuntrySelect';
import { Label } from 'shared/ui/Label';

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  renderAfterInput?: (ref: RefObject<HTMLInputElement>) => ReactNode;
}

export const PhoneNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  containerClassName,
  labelClassName,
  inputWrapperClassName,
  renderAfterInput,
  ...props
}: ControlledInputProps<T>) => {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => {
        const innerRef = useRef<HTMLInputElement>(null);

        const refs = useCombinedRef(ref, innerRef);

        const handleChange = (value: any) => {
          if (value === undefined) {
            onChange('');
          } else {
            const isStartWithPlus = value.startsWith('+');
            const isSecondCharNine = value[1] === '9';
            const isRuNumber = value.length === 11;

            if (isStartWithPlus && isSecondCharNine && isRuNumber) {
              onChange(`+7${value.slice(1)}`);
            } else {
              onChange(value);
            }
          }
        };

        return (
          <div className={classNames(styles.container, containerClassName)}>
            {label && (
              <Label asLabel htmlFor={id} className={classNames(styles.label, labelClassName)}>
                {label}
              </Label>
            )}

            <div className={classNames(styles.inputWrapper, inputWrapperClassName)}>
              <div className={styles.inputContainer}>
                <PhoneInput
                  {...props}
                  {...field}
                  onChange={handleChange}
                  id={id}
                  ref={refs}
                  className={classNames(styles.input, props.className)}
                  defaultCountry="RU"
                  international
                  countrySelectComponent={CountrySelectWithIcon}
                />
              </div>

              {renderAfterInput?.(innerRef)}
            </div>

            {error?.message && <ErrorMessage message={error.message} className={styles.error} />}
          </div>
        );
      }}
    />
  );
};
