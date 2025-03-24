'use client';

import React from 'react';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { Divider } from '@mui/material';
import styles from './SportAndActivityFormInitialOnboarding.module.scss';
import { Label } from 'shared/ui/Label';
import { StepsWheelPicker } from '../StepsWheelPicker/StepsWheelPicker';
import classNames from 'classnames';
import { Button, Loader, Slider } from 'shared/ui';
import { fitnessLevelOptions } from '../config';
import { pluralize } from 'shared/lib/formatter/pluralize';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const SportAndActivityFormInitialOnboarding = ({
  userProfile,
  onSuccess,
}: Props) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    isPending,
    control,
    steps,
    isFitnessLevelDefined,
    isSteps,
  } = useLocalForm({
    userProfile,
    onSuccess,
  });
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contentWrapper}>
        <div className={styles.wrapper}>
          <Slider
            label="Уровень физической подготовки"
            tooltip={
              <>
                <p>
                  <strong>Начинающий</strong>: Вы только начинаете или
                  занимаетесь нерегулярно, пока осваиваете базовые упражнения и
                  технику.
                </p>
                <p>
                  <strong>Средний</strong>: Вы тренируетесь 2–4 раза в неделю,
                  уверенно справляетесь с упражнениями средней сложности и уже
                  имеете опыт.
                </p>
                <p>
                  <strong>Продвинутый</strong>: Вы занимаетесь 5+ раз в неделю,
                  выполняете высокоинтенсивные тренировки и стремитесь к
                  конкретным результатам.
                </p>
              </>
            }
            control={control}
            name="fitness_level"
            min={0}
            max={fitnessLevelOptions.length - 1}
            step={1}
            valueLabelFormat={(value) =>
              isFitnessLevelDefined ? fitnessLevelOptions[value] : 'Не указано'
            }
            containerClassName={styles.input}
            valueLabelClassName={classNames({
              [styles.notDefinedLabel]: !isFitnessLevelDefined,
            })}
            formatValuePosition
          />
        </div>

        <Divider className={styles.divider} />

        <Label
          className={styles.label}
          tooltip="Посмотреть данные можно в приложении «Здоровье» (iPhone), Google Fit или на фитнес-трекере."
        >
          Средняя дистанция, которую вы проходите / пробегаете за день
        </Label>

        <div className={styles.steps}>
          <StepsWheelPicker
            defaultSelectedValues={[steps.toString()]}
            onSubmit={(data) => {
              setValue('steps', +data[0].value, { shouldDirty: true });
            }}
            inputValue={steps}
          />

          <p className={styles.stepsText}>
            {isSteps
              ? pluralize(steps, 'шаг', 'шага', 'шагов', false)
              : pluralize(steps, 'километр', 'километра', 'километров', false)}
          </p>
        </div>
      </div>

      <div className={styles.wrapper}>
        <Button type="submit" className={styles.button} disabled={isPending}>
          Далее
        </Button>
      </div>

      {isPending && <Loader />}
    </form>
  );
};
