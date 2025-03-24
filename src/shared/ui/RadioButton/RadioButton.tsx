import { FormControlLabel, FormControlLabelProps, Radio } from '@mui/material';
import React, { ReactNode } from 'react';
import { Label } from '../Label';
import styles from './RadioButton.module.scss';

interface Props {
  label: ReactNode;
  value: unknown;

  labelPlacement?: FormControlLabelProps['labelPlacement'];
  labelClassName?: string;
  className?: string;
}

export const RadioButton = ({
  label,
  value,
  labelPlacement,
  labelClassName,
  className,
}: Props) => {
  return (
    <FormControlLabel
      className={className}
      value={value}
      control={
        <Radio
          classes={{
            checked: styles.checkedIcon,
          }}
          checkedIcon={<span className={styles.span} />}
          size="small"
        />
      }
      labelPlacement={labelPlacement}
      label={<Label className={labelClassName}>{label}</Label>}
    />
  );
};
