'use client';

import React, { useMemo } from 'react';
import { UserProfile } from 'features/User/model';
import { Loader, useSnackbar, WithAbsoluteScrollBar } from 'shared/ui';
import { getDefaultValues } from './lib/getDefaultValues';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  MyHealthSportAndActivitySchema,
  myHealthSportAndActivitySchema,
} from 'features/InitialOnboard/schemas';
import { useUpdateUserSettings } from 'features/User/lib';

import styles from './MyHealthTrainingForm.module.scss';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import { useOnButtonClick } from '../TrainingInfoForm/lib/useOnButtonClick';
import { TrainingInfoFormFields } from '../TrainingInfoForm';
import { StrengthTrainingFormFields } from '../StrengthTrainingForm/components/StrengthTrainingFormFields';
import { Divider } from '@mui/material';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const MyHealthTrainingForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const defaultValues = useMemo(() => getDefaultValues(userProfile), []);

  const { handleSubmit, watch, setValue, getValues, reset, register, formState } = useForm({
    defaultValues,
    resolver: yupResolver(myHealthSportAndActivitySchema),
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

  const onSubmit = (form: MyHealthSportAndActivitySchema) => {
    console.log(
      {
        favorite_training_types: form.favorite_training_types || null,
        favorite_training_types_other: form.favorite_training_types_other || null,
        training_location: form.training_location || null,
        equipment: form.equipment || null,
        injuries_or_restrictions: form.injuries_or_restrictions || null,
      },
      'form',
    );

    mutate({
      ...userProfile,
      favorite_training_types: form.favorite_training_types || null,
      favorite_training_types_other: form.favorite_training_types_other || null,
      training_location: form.training_location || null,
      equipment: form.equipment || null,
      injuries_or_restrictions: form.injuries_or_restrictions || null,
    });
  };

  const handleButtonClick = useOnButtonClick(setValue);

  const form = watch();

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <WithAbsoluteScrollBar>
        <div className={styles.sport}>
          <p className={styles.title}>Спорт</p>

          <StrengthTrainingFormFields
            favoriteTrainingTypes={form.favorite_training_types || ''}
            favoriteTrainingTypesOther={form.favorite_training_types_other || ''}
            setValue={setValue}
          />
        </div>

        <Divider className={styles.divider} />

        <TrainingInfoFormFields
          register={register}
          form={form}
          handleButtonClick={handleButtonClick}
        />
      </WithAbsoluteScrollBar>

      <MyHealthFormSubmitButton type="submit" disabled={isPending} visible={formState.isDirty} />

      {isPending && <Loader />}
    </form>
  );
};
