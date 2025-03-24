'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import {
  UserProfile,
  UserSettingsSchema,
  userSettingsSchema,
} from 'features/User/model';
import {
  Button,
  ControlledDateInput,
  ControlledInput,
  EditableControlledInput,
  PhoneNumberInput,
  useSnackbar,
} from 'shared/ui';

import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserSettings } from 'features/User/lib';
import styles from './UserSettingsForm.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { DateWheelPicker } from 'shared/ui/DateWheelPicker';

interface Props {
  userData: UserProfile;
}

export const UserSettingsForm = ({ userData }: Props) => {
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();

  const defaultValues = useMemo(
    () => ({
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      phone_number: userData.phone_number || '',
      birth_date: userData.birth_date || '',
      email: userData.email,
    }),
    []
  );

  const { handleSubmit, watch, setValue, control, formState } = useForm({
    defaultValues,
    resolver: yupResolver(userSettingsSchema),
  });

  const { isPending, mutate } = useUpdateUserSettings({
    onSuccess: () => {
      showSnackbar('Данные успешно обновлены', 'success');
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  const onSubmit = (form: UserSettingsSchema) => {
    mutate({ ...userData, ...form });
  };

  const birthDate = watch('birth_date');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={3}>
        <EditableControlledInput
          renderInput={(props) => (
            <ControlledInput
              name="first_name"
              control={control}
              label="Имя"
              {...props}
            />
          )}
          isChanged={defaultValues?.first_name !== (userData.first_name || '')}
          isFormSubmitted={formState.isSubmitted}
        />

        <EditableControlledInput
          renderInput={(props) => (
            <ControlledInput
              name="last_name"
              control={control}
              label="Фамилия"
              {...props}
            />
          )}
          isChanged={defaultValues?.last_name !== (userData.last_name || '')}
          isFormSubmitted={formState.isSubmitted}
        />

        <EditableControlledInput
          renderInput={(props) => (
            <DateWheelPicker
              value={birthDate}
              onChange={(value) =>
                setValue('birth_date', value, { shouldDirty: true })
              }
              inputClassName={styles.dateInput}
              {...props}
            />
          )}
          isChanged={defaultValues?.birth_date !== (userData.birth_date || '')}
          isFormSubmitted={formState.isSubmitted}
        />

        <ControlledInput
          name="email"
          control={control}
          label="Электронная почта"
          disabled
        />

        <EditableControlledInput
          renderInput={(props) => (
            <PhoneNumberInput
              name="phone_number"
              control={control}
              label="Номер телефона"
              {...props}
            />
          )}
          isChanged={
            defaultValues?.phone_number !== (userData.phone_number || '')
          }
          isFormSubmitted={formState.isSubmitted}
        />

        <Button disabled={!formState.isDirty || isPending} type="submit">
          Сохранить
        </Button>
      </Stack>
    </form>
  );
};
