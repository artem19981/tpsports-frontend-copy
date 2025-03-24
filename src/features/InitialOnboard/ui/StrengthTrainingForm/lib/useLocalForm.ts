import { yupResolver } from '@hookform/resolvers/yup';
import {
  strengthTrainingSchema,
  StrengthTrainingSchema,
} from 'features/InitialOnboard/schemas';
import { UserProfile } from 'features/User/model';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { getStrengthTrainingFormDefaultValues } from './getStrengthTrainingFormDefaultValues';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(
    () => getStrengthTrainingFormDefaultValues(userProfile),
    []
  );

  const { handleSubmit, setValue, watch, reset, getValues, formState } =
    useForm({
      defaultValues,
      resolver: yupResolver(strengthTrainingSchema),
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

  const onSubmit = (form: StrengthTrainingSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);

    console.log({
      favorite_training_types: form.favorite_training_types || null,
      favorite_training_types_other: form.favorite_training_types_other || null,
    });

    if (isChanged) {
      mutate({
        ...userProfile,
        favorite_training_types: form.favorite_training_types || null,
        favorite_training_types_other:
          form.favorite_training_types_other || null,
      });
    } else {
      onSuccess();
    }
  };

  const [favoriteTrainingTypes = '', favoriteTrainingTypesOther = ''] = watch([
    'favorite_training_types',
    'favorite_training_types_other',
  ]);

  return {
    handleSubmit,
    onSubmit,
    favoriteTrainingTypes,
    favoriteTrainingTypesOther,
    isPending,
    setValue,
  };
};
