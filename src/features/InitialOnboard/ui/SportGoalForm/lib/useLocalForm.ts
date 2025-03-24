import { UserProfile } from 'features/User/model';
import { useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  sportGoalSchema,
  SportGoalSchema,
} from 'features/InitialOnboard/schemas';
import { useForm } from 'react-hook-form';
import { BUTTONS_GROUP_SEPARATOR, useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';
import { getDefaultValues } from '../lib/getDefaultValues';
import isEqual from 'lodash/isEqual';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const [showModal, setShowModal] = useState(false);

  const defaultValues = useMemo(
    () => getDefaultValues(userProfile),
    [userProfile]
  );

  const { formState, handleSubmit, reset, getValues, setValue, watch } =
    useForm({
      defaultValues,
      resolver: yupResolver(sportGoalSchema),
    });

  const { mutate, isPending } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());
      onSuccess();
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: SportGoalSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);

    if (isChanged) {
      mutate({
        ...userProfile,
        fitness_goal_other: form.fitness_goal_other || null,
        fitness_goal: form.fitness_goal || null,
      });
    } else {
      onSuccess();
    }
  };

  const [fitnessGoal, fitnessGoalOther] = watch([
    'fitness_goal',
    'fitness_goal_other',
  ]);

  const handleButtonClick = (value: string) => {
    const valuesArray = fitnessGoal
      ?.split(BUTTONS_GROUP_SEPARATOR)
      .map((v) => v.trim());

    if (valuesArray?.includes(value)) {
      const newValues = valuesArray.filter((v) => v !== value);
      setValue('fitness_goal', newValues.join(BUTTONS_GROUP_SEPARATOR), {
        shouldDirty: true,
      });
    } else {
      setValue(
        'fitness_goal',
        fitnessGoal
          ? `${fitnessGoal}${BUTTONS_GROUP_SEPARATOR}${value}`
          : value,
        { shouldDirty: true }
      );
    }
  };

  return {
    formState,
    handleSubmit,
    setValue,
    onSubmit,
    handleButtonClick,
    showModal,
    setShowModal,
    isPending,
    fitnessGoal,
    fitnessGoalOther,
  };
};
