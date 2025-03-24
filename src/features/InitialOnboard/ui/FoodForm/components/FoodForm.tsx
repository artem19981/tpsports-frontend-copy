'use client';

import React from 'react';

import { Slider, TextArea } from 'shared/ui';

import { Stack } from '@mui/material';
import { pluralize } from 'shared/lib/formatter/pluralize';
import { Bottle } from './Bottle';
import { UNBREAKABLE_SEPARATOR } from 'shared/constants/separator';
import classNames from 'classnames';

import styles from '../FoodForm.module.scss';

interface Props {
  control: any;
  register: any;
  form: any;
  isDailyWaterIntakeDefined: boolean;
}

export const FoodForm = ({
  control,
  form,
  register,
  isDailyWaterIntakeDefined,
}: Props) => {
  return (
    <>
      <Stack gap={2} direction="row" alignItems="flex-end" mb={4}>
        <Slider
          label={`Сколько чистой воды вы выпиваете${UNBREAKABLE_SEPARATOR}в${UNBREAKABLE_SEPARATOR}день`}
          control={control}
          name="daily_water_intake"
          min={0}
          max={3}
          step={0.5}
          valueLabelFormat={(value) =>
            isDailyWaterIntakeDefined
              ? pluralize(value, 'литр', 'литра', 'литров')
              : 'Не указано'
          }
          valueLabelClassName={classNames({
            [styles.notDefinedLabel]: !isDailyWaterIntakeDefined,
          })}
        />

        <Bottle
          liters={isDailyWaterIntakeDefined ? form.daily_water_intake! : 0}
        />
      </Stack>

      <TextArea
        label="Непереносимость продуктов"
        {...register('food_intolerance')}
        placeholder="Лактоза, глютен и др."
        containerClassName={styles.inputContainer}
        minRows={1}
      />

      <TextArea
        label="Аллергия на продукты"
        {...register('food_allergies')}
        containerClassName={styles.inputContainer}
        minRows={1}
        placeholder="Орехи, мёд, морепродукты и др."
      />
    </>
  );
};
