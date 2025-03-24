'use client';

import {
  Slider as _Slider,
  SliderProps,
  Stack,
  Typography,
} from '@mui/material';

import styles from './Slider.module.scss';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import classNames from 'classnames';
import { Label } from '../Label';
import { ReactNode } from 'react';

interface Props<T extends FieldValues> extends SliderProps {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  tooltip?: ReactNode;
  containerClassName?: string;
  valueLabelClassName?: string;
  wrapperClassName?: string;
  labelClassName?: string;

  formatValuePosition?: boolean;
  forcePositionForLabel?: boolean;
}

export const Slider = <T extends FieldValues>({
  label,
  tooltip,
  name,
  control,
  containerClassName,
  valueLabelClassName,
  wrapperClassName,
  labelClassName,
  formatValuePosition,
  forcePositionForLabel,
  ...props
}: Props<T>) => {
  return (
    <Stack
      direction="column"
      width={'100%'}
      className={classNames(styles.container, wrapperClassName)}
    >
      <Label
        className={classNames(styles.label, labelClassName)}
        tooltip={tooltip}
      >
        {label}
      </Label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <_Slider
            size="small"
            valueLabelDisplay="on"
            {...props}
            classes={{
              root: classNames(styles.slider, containerClassName),
              valueLabel: classNames(styles.valueLabel, valueLabelClassName, {
                [styles.first]: field.value == props.min,
                [styles.last]: field.value == props.max,
                [styles.forceFirst]:
                  field.value == props.min && forcePositionForLabel,
                [styles.forceLast]:
                  field.value == props.max && forcePositionForLabel,
              }),
              thumb: styles.thumb,
              track: styles.track,
            }}
            {...field}
          />
        )}
      />
    </Stack>
  );
};
