'use client';

import React, { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FoodSchema, foodSchema } from 'features/InitialOnboard/schemas';
import { UserProfile } from 'features/User/model';
import { useForm, useWatch } from 'react-hook-form';
import { Button, Loader, Slider, TextArea, useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';
import { useRouter } from 'next/navigation';
import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { CancelOnboardButton } from '../CancelOnboardButton';
import { Divider, Stack } from '@mui/material';
import { pluralize } from 'shared/lib/formatter/pluralize';
import { Bottle } from './components/Bottle';
import { UNBREAKABLE_SEPARATOR } from 'shared/constants/separator';
import classNames from 'classnames';

import styles from './FoodForm.module.scss';
import { getDefaultValues } from './lib/getDefaultValues';
import { useChangedFields } from 'shared/lib';
import { isDefined } from 'shared/lib/is-defined';

export const FoodForm = (userProfile: UserProfile) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(() => getDefaultValues(userProfile), []);

  const nextStep =
    userProfile.gender === 'мужчина'
      ? InitialOnboardStep.OrgansAssessmentPrepare
      : InitialOnboardStep.WomenHealth;

  const { handleSubmit, register, control, formState } = useForm({
    defaultValues,
    resolver: yupResolver(foodSchema),
  });

  const { changedFields } = useChangedFields(formState.dirtyFields);

  const { mutate, isPending, isSuccess } = useUpdateUserSettings({
    onSuccess: () => {
      router.push('/initial-onboard?step=' + nextStep);
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: FoodSchema) => {
    console.log({
      ...userProfile,
      ...(changedFields.daily_water_intake && {
        daily_water_intake: form.daily_water_intake,
      }),
      ...(changedFields.memory && {
        memory: form.memory,
      }),
      ...(changedFields.learning && {
        learning: form.learning,
      }),
      food_intolerance: form.food_intolerance || null,
      food_allergies: form.food_allergies || null,
    });

    // mutate({
    //   ...userProfile,
    //   daily_water_intake: null,
    //   memory: null,
    //   learning: null,
    //   food_intolerance: form.food_intolerance || null,
    //   food_allergies: form.food_allergies || null,
    // });

    mutate({
      ...userProfile,
      ...(changedFields.daily_water_intake && {
        daily_water_intake: form.daily_water_intake,
      }),
      ...(changedFields.memory && {
        memory: form.memory,
      }),
      ...(changedFields.learning && {
        learning: form.learning,
      }),
      food_intolerance: form.food_intolerance || null,
      food_allergies: form.food_allergies || null,
    });
  };

  const form = useWatch({ control });

  const isDailyWaterIntakeDefined =
    isDefined(userProfile.daily_water_intake) ||
    changedFields.daily_water_intake;

  const isMemoryDefined = isDefined(userProfile.memory) || changedFields.memory;
  const isLearningDefined =
    isDefined(userProfile.learning) || changedFields.learning;

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
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
      </div>

      <Divider className={styles.divider} />

      <div className={styles.wrapper}>
        <p className={styles.title}>Ментальное здоровье</p>

        <Slider
          label={`Хорошо ли вы запоминаете новую информацию`}
          tooltip={
            <>
              <p>
                <strong>0-3</strong> - Испытываю трудности с запоминанием,
                быстро забываю.
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
                <strong>7-8</strong> - Люблю осваивать новое, интересуюсь
                разными темами.
              </p>
              <p>
                <strong>9-10</strong> - Обожаю учиться, всегда ищу новые знания
                и навыки.
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
      </div>

      <div className={classNames(styles.footer, styles.wrapper)}>
        <CancelOnboardButton nextPage={nextStep} />

        <Button
          type="submit"
          className={styles.button}
          disabled={isPending || isSuccess}
        >
          Далее
        </Button>
      </div>

      {isPending && <Loader />}
    </form>
  );
};
