'use client';

import { useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  WomenHealthSchema,
  womenHealthSchema,
} from 'features/InitialOnboard/schemas';
import { UserProfile } from 'features/User/model';
import { useForm, useWatch } from 'react-hook-form';
import { useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';

import { useChangedFields } from 'shared/lib';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      menopause: userProfile.menopause || false,
      regular_periods: userProfile.regular_periods || true,
      painful_periods: userProfile.painful_periods || 7,
      pregnancy: userProfile.pregnancy || false,
      planning_pregnancy: userProfile.planning_pregnancy || false,
      breastfeeding: userProfile.breastfeeding || false,
    }),
    []
  );

  const { handleSubmit, reset, getValues, control, formState } = useForm({
    defaultValues,
    resolver: yupResolver(womenHealthSchema),
  });

  const { changedFields } = useChangedFields(formState.dirtyFields);

  const { mutate, isSuccess, isPending } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());
      onSuccess();
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: WomenHealthSchema) => {
    const isResetFields = form.menopause;

    console.log(
      {
        menopause: form.menopause,
        ...(changedFields.painful_periods && {
          painful_periods: form.painful_periods,
        }),
        regular_periods: form.regular_periods,
        pregnancy: form.pregnancy,
        planning_pregnancy: form.planning_pregnancy,
        breastfeeding: form.breastfeeding,
        ...(isResetFields && {
          regular_periods: null,
          painful_periods: null,
          pregnancy: null,
          planning_pregnancy: null,
          breastfeeding: null,
        }),
      },
      'form'
    );

    // mutate({
    //   ...userProfile,
    //   menopause: form.menopause,
    //   regular_periods: null,
    //   painful_periods: null,
    //   pregnancy: null,
    //   planning_pregnancy: null,
    //   breastfeeding: null,
    // });

    mutate({
      ...userProfile,
      menopause: form.menopause,
      ...(changedFields.painful_periods && {
        painful_periods: form.painful_periods,
      }),
      regular_periods: form.regular_periods,
      pregnancy: form.pregnancy,
      planning_pregnancy: form.planning_pregnancy,
      breastfeeding: form.breastfeeding,
      ...(isResetFields && {
        regular_periods: null,
        painful_periods: null,
        pregnancy: null,
        planning_pregnancy: null,
        breastfeeding: null,
      }),
    });
  };

  const menopause = useWatch({ control, name: 'menopause' });

  const isShowAllFields = !menopause;

  return {
    onSubmit,
    handleSubmit,
    control,
    formState,
    changedFields,
    isShowAllFields,
    isPending,
    isSuccess,
  };
};
