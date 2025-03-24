import { yupResolver } from '@hookform/resolvers/yup';
import {
  organsAssessmentSchema,
  OrgansAssessmentSchema,
} from 'features/InitialOnboard/schemas';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'shared/ui';

import { useUpdateUserSettings } from 'features/User/lib';

import isEqual from 'lodash/isEqual';
import { UserProfile } from 'features/User/model';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const useLocalForm = ({ userProfile, onSuccess }: Props) => {
  const showSnackbar = useSnackbar();

  const { handleSubmit, control, reset, getValues, formState } = useForm({
    defaultValues: {
      musculoskeletal_system: userProfile.musculoskeletal_system || '',
      cardiovascular_system: userProfile.cardiovascular_system || '',
      respiratory_system: userProfile.respiratory_system || '',
      digestive_system: userProfile.digestive_system || '',
      urinary_system: userProfile.urinary_system || '',
      nervous_system: userProfile.nervous_system || '',
      immune_system: userProfile.immune_system || '',
      endocrine_system: userProfile.endocrine_system || '',
    },
    resolver: yupResolver(organsAssessmentSchema),
  });

  const { mutate, isSuccess, isPending } = useUpdateUserSettings({
    onSuccess: () => {
      reset(getValues());
      onSuccess();
    },
    onError: () => {
      showSnackbar('Не удалось сохранить данные', 'error');
    },
  });

  const onSubmit = (form: OrgansAssessmentSchema) => {
    const isChanged = !isEqual(form, formState.defaultValues);

    if (isChanged) {
      Object.keys(form).forEach((key) => {
        if (!form[key as keyof typeof form]) {
          // @ts-ignore
          form[key as keyof typeof form] = null;
        }
      });

      console.log(form);

      mutate({ ...userProfile, ...form });
    } else {
      onSuccess();
    }
  };

  return {
    handleSubmit,
    control,
    isPending,
    isSuccess,
    onSubmit,
    isDirty: formState.isDirty,
  };
};
