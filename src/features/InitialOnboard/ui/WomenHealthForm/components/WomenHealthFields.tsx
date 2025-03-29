'use client';

import React from 'react';

import { Slider, ControlledToggleButtons } from 'shared/ui';

import styles from '../WomenHealthForm.module.scss';
import { pluralize } from 'shared/lib/formatter/pluralize';
import classNames from 'classnames';

interface Props {
  control: any;
  isShowAllFields: boolean;
}

export const WomenHealthFields = ({ control, isShowAllFields }: Props) => {
  return (
    <>
      <ControlledToggleButtons
        className={styles.buttonsContainer}
        control={control}
        name="menopause"
        label="Менопауза"
        labelFromLeft
        buttons={[
          { value: true, children: 'Да' },
          { value: false, children: 'Нет' },
        ]}
      />
      <div
        className={classNames(styles.hiddenBlocks, {
          [styles.hidden]: !isShowAllFields,
        })}
      >
        <ControlledToggleButtons
          className={styles.buttonsContainer}
          control={control}
          name="regular_periods"
          label="Регулярные месячные"
          labelFromLeft
          buttons={[
            { value: true, children: 'Да' },
            { value: false, children: 'Нет' },
          ]}
        />
        <Slider
          label="Болезненность месячных"
          tooltip={
            <>
              <p>
                <strong>0-3</strong> Нет болей.
              </p>
              <p>
                <strong>4-6</strong> Лёгкие боли, не мешающие повседневной
                жизни.
              </p>
              <p>
                <strong>7-8</strong> Сильные боли, заметно влияющие на
                активность.
              </p>
              <p>
                <strong>9-10</strong> Очень сильные боли, существенно
                ограничивающие деятельность.
              </p>
            </>
          }
          control={control}
          name="painful_periods"
          min={0}
          max={10}
          step={1}
          valueLabelFormat={(value) =>
            pluralize(value, 'балл', 'балла', 'баллов')
          }
          containerClassName={styles.sliderContainer}
        />
        <ControlledToggleButtons
          className={styles.buttonsContainer}
          control={control}
          name="pregnancy"
          label="Беременность"
          labelFromLeft
          buttons={[
            { value: true, children: 'Да' },
            { value: false, children: 'Нет' },
          ]}
        />
        <ControlledToggleButtons
          className={styles.buttonsContainer}
          control={control}
          name="planning_pregnancy"
          label="Планируете ли вы беременность в течение 3-х месяцев"
          labelFromLeft
          buttons={[
            { value: true, children: 'Да' },
            { value: false, children: 'Нет' },
          ]}
        />

        <ControlledToggleButtons
          className={styles.buttonsContainer}
          control={control}
          name="breastfeeding"
          label="Кормление грудью"
          labelFromLeft
          buttons={[
            { value: true, children: 'Да' },
            { value: false, children: 'Нет' },
          ]}
        />
      </div>
    </>
  );
};
