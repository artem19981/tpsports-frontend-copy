'use client';

import React from 'react';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { Button, Loader } from 'shared/ui';

import styles from '../SportGoalForm.module.scss';
import { allCategories } from '../config';
import { SportGoalCategory } from '../components/SportGoalCategory';
import { Label } from 'shared/ui/Label';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const SportGoalFormInitialOnboarding = ({ userProfile, onSuccess }: Props) => {
  const {
    handleSubmit,
    onSubmit,
    handleButtonClick,
    onToggleCategory,
    isPending,
    fitnessGoal,
    openedCategories,
  } = useLocalForm({
    userProfile,
    onSuccess,
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Label className={styles.label}>Это поможет настраивать для вас персональные решения</Label>

      <div className={styles.wrapper}>
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

      <Button type="submit" disabled={isPending}>
        Далее
      </Button>

      {isPending && <Loader />}

      {/* <OnboardingOtherModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(value) => {
          setValue('fitness_goal_other', value);
          setShowModal(false);
        }}
        title="Другие"
        label="Опишите ваши индивидуальные цели"
        defaultValue={fitnessGoalOther || ''}
      /> */}
    </form>
  );
};
