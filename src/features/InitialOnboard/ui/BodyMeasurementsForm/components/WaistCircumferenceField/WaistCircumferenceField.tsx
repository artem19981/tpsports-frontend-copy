import { BodyMeasurementsSchema } from 'features/InitialOnboard/schemas';
import { Control } from 'react-hook-form';
import { ControlledInput } from 'shared/ui';

import styles from './WaistCircumferenceField.module.scss';
import { formatMeasurement } from 'shared/lib/formatter/formatMeasurement';

interface Props {
  control: Control<BodyMeasurementsSchema>;
  className?: string;
}

export const WaistCircumferenceField = ({ control, className }: Props) => {
  return (
    <div className={className}>
      <ControlledInput
        control={control}
        name="waist_circumference"
        label="Обхват талии"
        labelTooltip={
          <>
            Если под рукой нет ленты, оберните нитку вокруг талии, а затем измерьте длину нитки с
            помощью линейки. Так вы легко узнаете свой обхват талии !
          </>
        }
        containerClassName={styles.waistInput}
        labelClassName={styles.waistInputLabel}
        formatValue={(value) => (value !== '' ? formatMeasurement(value as number, 'см') : '')}
        autoFocus
        maxLength={3}
      />
      <p className={styles.bodyIndexText}>
        Для измерения оберните ленту вокруг талии на 2-3 см выше пупка.
      </p>
    </div>
  );
};
