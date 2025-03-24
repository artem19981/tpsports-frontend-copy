'use client';

import { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FoodSchema, foodSchema } from 'features/InitialOnboard/schemas';
import { useForm, useWatch } from 'react-hook-form';
import { useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';

import { getDefaultValues } from '../lib/getDefaultValues';
import { useChangedFields } from 'shared/lib';
import { isDefined } from 'shared/lib/is-defined';
import { UserProfile } from 'features/User/model';
import { getIsDirty } from './getIsDirty';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(() => getDefaultValues(userProfile), []);

  const { handleSubmit, register, reset, getValues, control, formState } =
    useForm({
      defaultValues,
      resolver: yupResolver(foodSchema),
    });

  const { changedFields, reset: resetChangedFields } = useChangedFields(
    formState.dirtyFields
  );

  const { mutate, isPending, isSuccess } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());
      resetChangedFields();
      onSuccess();
      //   router.push('/initial-onboard?step=' + nextStep);
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: FoodSchema) => {
    console.log({
      daily_water_intake: changedFields.daily_water_intake
        ? form.daily_water_intake
        : userProfile.daily_water_intake,
      memory: changedFields.memory ? form.memory : userProfile.memory,
      learning: changedFields.learning ? form.learning : userProfile.learning,
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
      daily_water_intake: changedFields.daily_water_intake
        ? form.daily_water_intake
        : userProfile.daily_water_intake,
      memory: changedFields.memory ? form.memory : userProfile.memory,
      learning: changedFields.learning ? form.learning : userProfile.learning,
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

  return {
    isDailyWaterIntakeDefined,
    isMemoryDefined,
    isLearningDefined,
    form,
    handleSubmit,
    register,
    isPending,
    isSuccess,
    control,
    isDirty: getIsDirty(changedFields, userProfile, form),
    onSubmit,
  };
};
