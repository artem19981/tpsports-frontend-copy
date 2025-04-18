'use client';

import React from 'react';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { Loader, WithAbsoluteScrollBar } from 'shared/ui';

import styles from '../SportGoalForm.module.scss';
import { allCategories } from '../config';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import { SportGoalCategory } from '../components/SportGoalCategory';
import { Label } from 'shared/ui/Label';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const SportGoalFormMyHealth = ({ userProfile, onSuccess }: Props) => {
  const {
    formState,
    handleSubmit,
    onSubmit,
    handleButtonClick,
    openedCategories,
    onToggleCategory,
    setValue,
    isPending,
    fitnessGoal,
  } = useLocalForm({
    userProfile,
    onSuccess,
  });

  return (
    <form className={styles.myHealthContainer} onSubmit={handleSubmit(onSubmit)}>
      <WithAbsoluteScrollBar>
        <div className={styles.content}>
          <p className={styles.title}>Цели</p>
          <Label className={styles.label}>
            Это поможет настраивать для вас персональные решения
          </Label>

          <div className={styles.myHealthWrapper}>
            {allCategories.map((group) => (
              <SportGoalCategory
                key={group}
                onClick={handleButtonClick}
                category={group}
                activeButtons={fitnessGoal || ''}
                openedCategories={openedCategories}
                onToggleCategory={onToggleCategory}
              />
            ))}
          </div>
        </div>
      </WithAbsoluteScrollBar>

      <MyHealthFormSubmitButton
        type="submit"
        disabled={isPending}
        visible={formState.isDirty}
        label="Изменить цели"
      />

      {isPending && <Loader />}

      {/* <OnboardingOtherModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(value) => {
          setValue('fitness_goal_other', value, { shouldDirty: true });
          setShowModal(false);
        }}
        title="Другие"
        label="Опишите ваши индивидуальные цели"
        defaultValue={fitnessGoalOther || ''}
        className={styles.modal}
      /> */}
    </form>
  );
};
