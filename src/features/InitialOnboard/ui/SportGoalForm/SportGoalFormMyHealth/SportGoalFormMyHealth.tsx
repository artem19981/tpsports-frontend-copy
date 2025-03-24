'use client';

import React from 'react';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import {
  Button,
  BUTTONS_GROUP_SEPARATOR,
  ButtonsGroup,
  Loader,
  WithAbsoluteScrollBar,
} from 'shared/ui';

import styles from '../SportGoalForm.module.scss';
import { buttons } from '../config';
import {
  MyHealthFormSubmitButton,
  OnboardingOtherModal,
} from 'entities/onboarding/ui';

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
    showModal,
    setShowModal,
    setValue,
    isPending,
    fitnessGoal,
    fitnessGoalOther,
  } = useLocalForm({
    userProfile,
    onSuccess,
  });

  return (
    <form
      className={styles.myHealthContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <WithAbsoluteScrollBar>
        <div className={styles.content}>
          <p className={styles.title}>Цели</p>

          <div className={styles.myHealthWrapper}>
            <ButtonsGroup
              buttons={buttons}
              activeButtons={fitnessGoal?.split(BUTTONS_GROUP_SEPARATOR) || []}
              onClick={handleButtonClick}
              className={styles.buttons}
            >
              <Button
                onClick={() => setShowModal(true)}
                className={styles.button}
                variant="transparent"
              >
                Другие
              </Button>
            </ButtonsGroup>
          </div>
        </div>
      </WithAbsoluteScrollBar>

      <MyHealthFormSubmitButton
        type="submit"
        disabled={isPending}
        visible={formState.isDirty}
      />

      {isPending && <Loader />}

      <OnboardingOtherModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(value) => {
          setValue('fitness_goal_other', value, { shouldDirty: true });
          setShowModal(false);
        }}
        title="Другие"
        label="Опишите ваши индивидуальные цели"
        defaultValue={fitnessGoalOther || ''}
      />
    </form>
  );
};
