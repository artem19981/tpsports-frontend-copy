'use client';

import React from 'react';

import { UserProfile } from 'features/User/model';
import { Loader, WithAbsoluteScrollBar } from 'shared/ui';
import { useLocalForm } from '../lib/useLocalForm';
import { WomenHealthFields } from '../components/WomenHealthFields';

import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import styles from '../WomenHealthForm.module.scss';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const MyHealthWomenForm = (props: Props) => {
  const {
    onSubmit,
    handleSubmit,
    control,
    isShowAllFields,
    isPending,
    formState,
  } = useLocalForm(props);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <WithAbsoluteScrollBar>
        <p className={styles.title}>Женское здоровье</p>

        <div className={styles.myHealthWrapper}>
          <WomenHealthFields
            control={control}
            isShowAllFields={isShowAllFields}
          />
        </div>
      </WithAbsoluteScrollBar>

      <MyHealthFormSubmitButton
        type="submit"
        disabled={isPending}
        visible={formState.isDirty}
      />

      {isPending && <Loader />}
    </form>
  );
};
