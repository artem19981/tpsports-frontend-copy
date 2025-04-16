'use client';

import { MyHealthCategory } from 'entities/onboarding/ui';
import React, { memo, ReactNode } from 'react';
import {
  BodyMeasurementsHealthForm,
  LifestyleMyHealthForm,
  MyHealthFoodForm,
  MyHealthMentalHealthForm,
  MyHealthTrainingForm,
  MyHealthWomenForm,
  OrgansAssessmentMyHealthForm,
  SportAndActivityHealthForm,
  SportGoalFormMyHealth,
} from 'features/InitialOnboard';
import { UserProfile } from 'features/User/model';
import { useSnackbar } from 'shared/ui';

import styles from './MyHealthActiveForm.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'shared/constants/query-keys';

interface Props {
  activeCategory: MyHealthCategory | undefined;
  userProfile: UserProfile;
}

export const MyHealthActiveForm = memo(({ activeCategory, userProfile }: Props) => {
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    showSnackbar('Данные успешно сохранены', 'success');
  };

  const componentByStep: Record<MyHealthCategory, ReactNode> = {
    [MyHealthCategory.BodyMeasurements]: (
      <BodyMeasurementsHealthForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.SportAndActivity]: (
      <SportAndActivityHealthForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.Training]: (
      <MyHealthTrainingForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.Goals]: (
      <SportGoalFormMyHealth userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.Lifestyle]: (
      <LifestyleMyHealthForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.Food]: <MyHealthFoodForm userProfile={userProfile} onSuccess={onSuccess} />,
    [MyHealthCategory.MentalHealth]: (
      <MyHealthMentalHealthForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.WomenHealth]: (
      <MyHealthWomenForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
    [MyHealthCategory.OrgansAndSystems]: (
      <OrgansAssessmentMyHealthForm userProfile={userProfile} onSuccess={onSuccess} />
    ),
  };

  if (!activeCategory) {
    return;
  }

  return <div className={styles.container}>{componentByStep[activeCategory]}</div>;
});

MyHealthActiveForm.displayName = 'MyHealthActiveForm';
