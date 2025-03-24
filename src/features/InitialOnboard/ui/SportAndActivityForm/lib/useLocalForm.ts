import { UserProfile } from 'features/User/model';
import { getIsSteps } from './getIsSteps';
import { isDefined } from 'shared/lib/is-defined';
import { getStepsString } from './getStepsString';
import {
  sportAndActivitySchema,
  SportAndActivitySchema,
} from 'features/InitialOnboard/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChangedFields } from 'shared/lib';
import { useUpdateUserSettings } from 'features/User/lib';
import { useSnackbar } from 'shared/ui';
import { useMemo } from 'react';
import { getDefaultValues } from './getDefaultValues';
import { fitnessLevelOptions } from '../config';
import { getIsDirty } from './getIsDirty';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(() => getDefaultValues(userProfile), []);

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState,
  } = useForm({
    defaultValues,
    resolver: yupResolver(sportAndActivitySchema),
  });

  const { changedFields, hasAnyFieldChanged } = useChangedFields(
    formState.dirtyFields
  );

  const { mutate, isPending } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());

      onSuccess();
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: SportAndActivitySchema) => {
    const steps = getStepsString(form.steps);

    console.log(
      {
        ...userProfile,
        ...(changedFields.fitness_level && {
          fitness_level: fitnessLevelOptions[+form.fitness_level],
        }),
        ...(changedFields.steps && { steps }),
      },
      'form'
    );

    // mutate({
    //   ...userProfile,
    //   fitness_level: null,
    //   steps: null,
    // });
    // return;
    if (hasAnyFieldChanged) {
      mutate({
        ...userProfile,
        ...(changedFields.fitness_level && {
          fitness_level: fitnessLevelOptions[+form.fitness_level],
        }),
        ...(changedFields.steps && { steps }),
      });
    } else {
      onSuccess();
    }
  };

  const form = watch();

  const isSteps = getIsSteps(form.steps);

  const isFitnessLevelDefined =
    isDefined(userProfile.fitness_level) || changedFields.fitness_level;

  return {
    isSteps,
    isFitnessLevelDefined,
    isPending,
    handleSubmit,
    onSubmit,
    setValue,
    control,
    steps: form.steps,
    isDirty: getIsDirty(changedFields, userProfile, form),
  };
};
