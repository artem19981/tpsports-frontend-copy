'use client';

import React from 'react';

import { Slider } from 'shared/ui';

import { pluralize } from 'shared/lib/formatter/pluralize';
import classNames from 'classnames';

import styles from '../FoodForm.module.scss';

interface Props {
  control: any;
  isLearningDefined: boolean;
  isMemoryDefined: boolean;
}

export const MentalHealthForm = ({
  control,
  isLearningDefined,
  isMemoryDefined,
}: Props) => {
  return (
    <>
      <Slider
        label={`Хорошо ли вы запоминаете новую информацию`}
        tooltip={
          <>
            <p>
              <strong>0-3</strong> - Испытываю трудности с запоминанием, быстро
              забываю.
            </p>
            <p>
              <strong>4-6</strong> - Запоминаю со средней скоростью, иногда
              приходится повторять.
            </p>
            <p>
              <strong>7-8</strong> - Запоминаю хорошо, редко испытываю
              сложности.
            </p>
            <p>
              <strong>9-10</strong> - Быстро усваиваю информацию и легко её
              вспоминаю.
            </p>
          </>
        }
        control={control}
        name="memory"
        min={0}
        max={10}
        step={1}
        valueLabelFormat={(value) =>
          isMemoryDefined
            ? pluralize(value, 'балл', 'балла', 'баллов')
            : 'Не указано'
        }
        valueLabelClassName={classNames({
          [styles.notDefinedLabel]: !isMemoryDefined,
        })}
        containerClassName={styles.sliderContainer}
        labelClassName={styles.sliderLabel}
      />

      <Slider
        label={`Оцените ваше желание обучаться чему-то новому`}
        tooltip={
          <>
            <p>
              <strong>0-3</strong> - Неинтересно, избегаю нового.
            </p>
            <p>
              <strong>4-6</strong> - Учусь при необходимости, но без особого
              энтузиазма.
            </p>
            <p>
              <strong>7-8</strong> - Люблю осваивать новое, интересуюсь разными
              темами.
            </p>
            <p>
              <strong>9-10</strong> - Обожаю учиться, всегда ищу новые знания и
              навыки.
            </p>
          </>
        }
        control={control}
        name="learning"
        min={0}
        max={10}
        step={1}
        valueLabelFormat={(value) =>
          isLearningDefined
            ? pluralize(value, 'балл', 'балла', 'баллов')
            : 'Не указано'
        }
        valueLabelClassName={classNames({
          [styles.notDefinedLabel]: !isLearningDefined,
        })}
        containerClassName={styles.sliderContainer}
        labelClassName={styles.sliderLabel}
      />
    </>
  );
};
