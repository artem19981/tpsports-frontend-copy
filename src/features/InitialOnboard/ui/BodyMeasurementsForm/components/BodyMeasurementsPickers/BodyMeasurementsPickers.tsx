import React from 'react';
import { Input, WheelPicker } from 'shared/ui';
import { heightWheels, weightWheels } from '../../config';
import { formatMeasurement } from 'shared/lib/formatter/formatMeasurement';
import { getSelectedWeight } from '../../lib/getSelectedWeight';

import styles from './BodyMeasurementsPickers.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import { BodyMeasurementsSchema } from 'features/InitialOnboard/schemas';

interface Props {
  form: BodyMeasurementsSchema;
  setValue: UseFormSetValue<BodyMeasurementsSchema>;
  isSmallHeight: boolean;
}

export const BodyMeasurementsPickers = ({
  form,
  setValue,
  isSmallHeight,
}: Props) => {
  const { kilograms, grams } = getSelectedWeight(form.weight);

  return (
    <>
      <WheelPicker
        title="Рост"
        wheels={[heightWheels]}
        postfix="см"
        renderContainer={(props) => (
          <Input
            label="Рост"
            containerClassName={styles.input}
            {...props}
            value={form.height ? formatMeasurement(form.height, 'см') : ''}
            readOnly
          />
        )}
        defaultSelectedValues={
          form.height ? [form.height.toString()] : [heightWheels[0].value]
        }
        visibleItems={isSmallHeight ? 5 : 7}
        onSubmit={(data) => {
          setValue('height', +data[0].value, { shouldDirty: true });
        }}
      />
      <WheelPicker
        title="Вес"
        wheels={weightWheels}
        renderContainer={(props) => (
          <Input
            label="Вес"
            containerClassName={styles.input}
            {...props}
            value={form.weight ? formatMeasurement(form.weight, 'кг') : ''}
            readOnly
          />
        )}
        headers={['кг', 'г']}
        defaultSelectedValues={
          form.weight
            ? [kilograms, grams]
            : [weightWheels[0][0].value, weightWheels[1][0].value]
        }
        visibleItems={isSmallHeight ? 5 : 7}
        onSubmit={(data) => {
          setValue('weight', +data[0].value + +data[1].value / 1000, {
            shouldDirty: true,
          });
        }}
      />
    </>
  );
};
