import React from 'react';
import styles from './BodyIndex.module.scss';
import { toFixed } from 'shared/lib/to-fixed';
import { BodyMeasurementsSchema } from 'features/InitialOnboard/schemas';
import { Label } from 'shared/ui/Label';

interface Props {
  form: BodyMeasurementsSchema;
  className?: string;
}

export const BodyIndex = ({ form, className }: Props) => {
  const bodyIndex =
    form.height && form.weight ? toFixed(form.weight / Math.pow(form.height / 100, 2), 2) : 0;

  return (
    <div className={className}>
      <Label
        className={styles.bodyIndexTitle}
        tooltip={
          <>
            <strong>Индекс массы тела (ИМТ)</strong>  — индикатор вашего телесного жира.
            Он рассчитывается на основе роста и веса, определяя ваш вес как недостаточный,
            нормальный или избыточный. Этот индекс может также помочь оценить риск болезней,
            связанных с избыточным весом.
          </>
        }
      >
        Индекс массы тела
      </Label>
      <p className={styles.bodyIndexSubtitle}>{bodyIndex}</p>
    </div>
  );
};
