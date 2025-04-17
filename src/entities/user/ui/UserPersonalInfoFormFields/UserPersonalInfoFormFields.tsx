'use client';

import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

import { ControlledInput, ControlledToggleButtons, PhoneNumberInput } from 'shared/ui';

import { DateWheelPicker } from 'shared/ui/DateWheelPicker';
import { UserSettingsSchema } from '../../schemas';
import { Gender } from 'entities/user/model';
import { Stack } from '@mui/material';

interface Props {
  control: Control<UserSettingsSchema>;
  birthDate: string | undefined;
  inputWrapperClassName?: string;
  modalClassName?: string;

  setValue: UseFormSetValue<UserSettingsSchema>;
}

export const UserPersonalInfoFormFields = ({
  control,
  birthDate,
  inputWrapperClassName,
  modalClassName,
  setValue,
}: Props) => {
  return (
    <Stack spacing={3.75} flex={1}>
      <ControlledInput
        inputWrapperClassName={inputWrapperClassName}
        label="Имя"
        control={control}
        name="first_name"
      />
      <ControlledInput
        inputWrapperClassName={inputWrapperClassName}
        label="Фамилия"
        control={control}
        name="last_name"
      />

      <DateWheelPicker
        value={birthDate}
        onChange={(value) => setValue('birth_date', value, { shouldDirty: true })}
        inputClassName={inputWrapperClassName}
        modalClassName={modalClassName}
      />

      <ControlledToggleButtons
        control={control}
        name="gender"
        label="Пол"
        buttons={[
          { value: Gender.Female, children: 'Женский' },
          { value: Gender.Male, children: 'Мужской' },
        ]}
      />

      <PhoneNumberInput
        label="Номер телефона"
        inputWrapperClassName={inputWrapperClassName}
        control={control}
        name="phone_number"
      />
    </Stack>
  );
};
