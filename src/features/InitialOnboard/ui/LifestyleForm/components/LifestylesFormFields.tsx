'use client';

import React from 'react';

import { Slider, ControlledToggleButtons } from 'shared/ui';

import styles from '../LifestyleForm.module.scss';
import { pluralize } from 'shared/lib/formatter/pluralize';
import { SleepWheelPicker } from './SleepWheelPicker';
import { calculateSleepDuration } from '../lib/calculateSleepDuration';
import ellipseSrc from '../assets/ellipse.png';
import Image from 'next/image';
import { Label } from 'shared/ui/Label';
import { alcoholOptions } from '../config';
import classNames from 'classnames';
import { LifestyleSchema } from 'features/InitialOnboard/schemas';
import { UseFormSetValue, Control } from 'react-hook-form';

interface Props {
  form: any;
  isAlcoholConsumptionDefined: boolean;
  isSleepQualityDefined: boolean;
  modalClassName?: string;

  setValue: UseFormSetValue<LifestyleSchema>;
  control: Control<LifestyleSchema>;
}

export const LifestylesFormFields = ({
  form,
  control,
  isAlcoholConsumptionDefined,
  isSleepQualityDefined,
  modalClassName,
  setValue,
}: Props) => {
  return (
    <>
      <Label className={styles.label}>Режим сна</Label>

      <SleepWheelPicker
        form={form}
        setValue={setValue}
        modalClassName={classNames(styles.dialog, modalClassName)}
      />

      <div className={styles.sleepDurationContainer}>
        <p className={styles.sleepDuration}>
          {calculateSleepDuration(form.sleep_schedule_down!, form.sleep_schedule_wakeUp!)}
        </p>
        <p className={styles.sleepDurationLabel}>Часов сна</p>

        <Image src={ellipseSrc} alt="" className={styles.ellipseContainer} />
      </div>

      <Slider
        forcePositionForLabel
        label="Качество сна"
        tooltip={
          <>
            <p>
              <strong>0-3</strong> Частые пробуждения, бессонница, ощущение усталости после сна.
            </p>
            <p>
              <strong>4-6</strong> Сон прерывистый, не всегда чувствую себя отдохнувшим.
            </p>
            <p>
              <strong>7-8</strong> Сплю спокойно, просыпаюсь бодрым.
            </p>
            <p>
              <strong>9-10</strong> Глубокий, восстанавливающий сон, полное ощущение отдыха.
            </p>
          </>
        }
        control={control}
        name="sleep_quality"
        min={0}
        max={10}
        step={1}
        valueLabelFormat={(value) =>
          isSleepQualityDefined ? pluralize(value, 'балл', 'балла', 'баллов') : 'Не указано'
        }
        valueLabelClassName={classNames({
          [styles.notDefinedLabel]: !isSleepQualityDefined,
        })}
        wrapperClassName={styles.sleepQualityInput}
        formatValuePosition
      />

      <div className={styles.smoking}>
        <Label className={styles.label}>Курение</Label>

        <ControlledToggleButtons
          control={control}
          name="smoking"
          buttons={[
            { value: true, children: 'Да' },
            { value: false, children: 'Нет' },
          ]}
        />
      </div>

      <Slider
        forcePositionForLabel
        label="Употребление алкоголя"
        control={control}
        name="alcohol_consumption"
        min={0}
        max={alcoholOptions.length - 1}
        step={1}
        valueLabelFormat={(value) =>
          isAlcoholConsumptionDefined ? alcoholOptions[value] : 'Не указано'
        }
        valueLabelClassName={classNames({
          [styles.notDefinedLabel]: !isAlcoholConsumptionDefined,
        })}
        containerClassName={styles.input}
        formatValuePosition
      />
    </>
  );
};
