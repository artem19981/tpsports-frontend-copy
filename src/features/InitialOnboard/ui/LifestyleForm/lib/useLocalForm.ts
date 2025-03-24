import { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  lifestyleSchema,
  LifestyleSchema,
} from 'features/InitialOnboard/schemas';
import { useForm, useWatch } from 'react-hook-form';
import { useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';
import { getDefaultValues } from '../lib/getDefaultValues';
import { alcoholOptions } from '../config';
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

  const { handleSubmit, setValue, reset, getValues, control, formState } =
    useForm({
      defaultValues,
      resolver: yupResolver(lifestyleSchema),
    });

  const { changedFields, reset: resetChangedFields } = useChangedFields(
    formState.dirtyFields
  );

  const { mutate, isPending, isSuccess } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());
      resetChangedFields();
      onSuccess();
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: LifestyleSchema) => {
    const {
      sleep_schedule_wakeUp,
      sleep_schedule_down,
      alcohol_consumption,
      sleep_quality,
      ...other
    } = form;

    console.log({
      ...other,
      ...(changedFields.alcohol_consumption && {
        alcohol_consumption: alcoholOptions[alcohol_consumption],
      }),
      ...(changedFields.sleep_quality && {
        sleep_quality: form.sleep_quality,
      }),
      sleep_schedule: {
        bedtime: sleep_schedule_down,
        wake_time: sleep_schedule_wakeUp,
      },
    });

    // mutate({
    //   ...userProfile,
    //   ...other,
    //   smoking: null,
    //   alcohol_consumption: null,
    //   sleep_quality: null,
    //   sleep_schedule: {
    //     bedtime: sleep_schedule_down,
    //     wake_time: sleep_schedule_wakeUp,
    //   },
    // });

    mutate({
      ...userProfile,
      ...other,
      ...(changedFields.alcohol_consumption && {
        alcohol_consumption: alcoholOptions[alcohol_consumption],
      }),
      ...(changedFields.sleep_quality && {
        sleep_quality: form.sleep_quality,
      }),
      sleep_schedule: {
        bedtime: sleep_schedule_down,
        wake_time: sleep_schedule_wakeUp,
      },
    });
  };

  const form = useWatch({ control });

  const isAlcoholConsumptionDefined =
    isDefined(userProfile.alcohol_consumption) ||
    changedFields.alcohol_consumption;

  const isSleepQualityDefined =
    isDefined(userProfile.sleep_quality) || changedFields.sleep_quality;

  return {
    form,
    isAlcoholConsumptionDefined,
    isSleepQualityDefined,
    isPending,
    isSuccess,
    isDirty: getIsDirty(changedFields, userProfile, form),
    control,
    setValue,
    onSubmit,
    handleSubmit,
  };
};
