import { yupResolver } from '@hookform/resolvers/yup';
import {
  BodyMeasurementsSchema,
  bodyMeasurementsSchema,
} from 'features/InitialOnboard/schemas';
import { useUpdateUserSettings } from 'features/User/lib';
import { UserProfile } from 'features/User/model';
import { isEqual } from 'lodash';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'shared/ui';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    control,
    formState,
  } = useForm({
    defaultValues: {
      height: userProfile.height || 0,
      weight: userProfile.weight || 0,
      waist_circumference: userProfile.waist_circumference?.toString() || '',
    },
    resolver: yupResolver(bodyMeasurementsSchema),
  });

  const { mutate, isPending } = useUpdateUserSettings({
    onSuccess: () => {
      const form = getValues();

      reset({
        height: form.height || 0,
        weight: form.weight || 0,
        waist_circumference: form.waist_circumference?.toString() || '',
      });

      onSuccess?.();
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: BodyMeasurementsSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);

    if (isChanged) {
      mutate({
        ...userProfile,
        height: form.height || null,
        weight: form.weight || null,
        waist_circumference: form.waist_circumference
          ? +form.waist_circumference
          : null,
      });
    } else {
      onSuccess();
    }
  };

  const form = watch();

  return {
    form,
    control,
    isPending,
    setValue,
    onSubmit,
    handleSubmit,
    isDirty: formState.isDirty,
  };
};
