'use client';

import React from 'react';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import {
  Button,
  BUTTONS_GROUP_SEPARATOR,
  ButtonsGroup,
  Loader,
} from 'shared/ui';

import ellipseSrc from 'shared/assets/ellipse.png';
import styles from '../SportGoalForm.module.scss';
import { buttons } from '../config';
import { OnboardingOtherModal } from 'entities/onboarding/ui';
import Image from 'next/image';
import classNames from 'classnames';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const SportGoalFormInitialOnboarding = ({
  userProfile,
  onSuccess,
}: Props) => {
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
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <ButtonsGroup
          buttons={buttons}
          activeButtons={fitnessGoal?.split(BUTTONS_GROUP_SEPARATOR) || []}
          onClick={handleButtonClick}
          className={styles.buttons}
        >
          <Button
            onClick={() => setShowModal(true)}
            className={classNames(styles.button, {
              [styles.active]: !!fitnessGoalOther,
            })}
            variant="transparent"
          >
            Другие
          </Button>
        </ButtonsGroup>
      </div>

      <Button type="submit" disabled={isPending}>
        Далее
      </Button>

      {isPending && <Loader />}

      <OnboardingOtherModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(value) => {
          setValue('fitness_goal_other', value);
          setShowModal(false);
        }}
        title="Другие"
        label="Опишите ваши индивидуальные цели"
        defaultValue={fitnessGoalOther || ''}
      />

      <Image className={styles.image} src={ellipseSrc} alt="ellipse" />
    </form>
  );
};
