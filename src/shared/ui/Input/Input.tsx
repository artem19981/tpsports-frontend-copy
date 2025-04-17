'use client';

import React, {
  FocusEvent,
  ReactNode,
  RefObject,
  forwardRef,
  memo,
  useId,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';
import { useCombinedRef } from 'shared/lib';
import Eye from './assets/eye.svg?component';
import EyeOff from './assets/eyeOff.svg?component';

import { ErrorMessage } from '../ErrorMessage';
import { IconButton } from '../IconButton/IconButton';

import styles from './input.module.scss';
import classNames from 'classnames';
import { Label } from '../Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  labelTooltip?: ReactNode;

  labelClassName?: string;
  containerClassName?: string;
  inputWrapperClassName?: string;

  formatValue?: (value: string | number | readonly string[] | undefined) => string;
  renderAfterInput?: (ref: RefObject<HTMLInputElement>) => ReactNode;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      errorMessage,
      label,
      labelTooltip,
      labelClassName,
      containerClassName,
      inputWrapperClassName,
      renderAfterInput,
      formatValue,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [showFormattedValue, setShowFormattedValue] = useState(!!formatValue);
    const [showPassword, setShowPassword] = useState(false);

    const id = useId();
    const innerRef = useRef<HTMLInputElement>(null);

    const refs = useCombinedRef(ref, innerRef);

    const isPasswordInput = props.type === 'password';

    const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      if (formatValue) {
        setShowFormattedValue(true);
      }

      props.onBlur?.(e);
    };

    const showInput = () => {
      setShowFormattedValue(false);
    };

    return (
      <div className={cn(styles.container, containerClassName)} onClick={onClick}>
        {label && (
          <Label
            asLabel
            htmlFor={id}
            tooltip={labelTooltip}
            className={cn(styles.label, labelClassName)}
          >
            {label}
          </Label>
        )}

        <div className={classNames(styles.inputWrapper, inputWrapperClassName)}>
          <div className={styles.inputContainer}>
            {formatValue && showFormattedValue ? (
              <p className={styles.formattedValue} onClick={showInput}>
                {formatValue(props.value)}
              </p>
            ) : (
              <input
                id={id}
                {...props}
                type={isPasswordInput ? (showPassword ? 'text' : 'password') : props.type}
                onBlur={onBlur}
                className={cn(styles.input, props.className)}
                ref={refs}
                // autoComplete="off"
              />
            )}

            {isPasswordInput && (
              <IconButton className={styles.icon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </IconButton>
            )}
          </div>

          {renderAfterInput?.(innerRef)}
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} className={styles.error} />}
      </div>
    );
  },
);

export const Input = memo(InputComponent);

Input.displayName = 'Input';
