import React from 'react';
import styles from './BodyIndex.module.scss';
import { toFixed } from 'shared/lib/to-fixed';
import { BodyMeasurementsSchema } from 'features/InitialOnboard/schemas';

interface Props {
  form: BodyMeasurementsSchema;
  className?: string;
}

export const BodyIndex = ({ form, className }: Props) => {
  const bodyIndex =
    form.height && form.weight
      ? toFixed(form.weight / Math.pow(form.height / 100, 2), 2)
      : 0;

  return (
    <div className={className}>
      <p className={styles.bodyIndexSubtitle}>{bodyIndex}</p>
      <p className={styles.bodyIndexTitle}>Индекс массы тела</p>
    </div>
  );
};
