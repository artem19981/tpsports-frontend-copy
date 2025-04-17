'use client';

import { InitialOnboardStep } from 'features/InitialOnboard/model';
import { UserProfile } from 'features/User/model';
import React, { ReactNode } from 'react';
import {
  BodyMeasurements,
  InitialStep,
  PersonalInformation,
  SportAndActivity,
  SportGoal,
  TrainingInfo,
  Lifestyle,
  Food,
  WomenHealth,
  OrgansAssessmentPrepare,
  OrgansAssessment,
  Final,
  StrengthTraining,
} from 'widgets/InitialOnboard';

interface Props {
  step: InitialOnboardStep;
  userProfile: UserProfile;
}

export const InitialOnboard = ({ step, userProfile }: Props) => {
  console.log(userProfile, 'userProfile');

  const componentByStep: Record<InitialOnboardStep, ReactNode> = {
    [InitialOnboardStep.Initial]: <InitialStep userProfile={userProfile} />,
    [InitialOnboardStep.PersonalInfo]: <PersonalInformation userProfile={userProfile} />,
    [InitialOnboardStep.BodyMeasurement]: <BodyMeasurements userProfile={userProfile} />,
    [InitialOnboardStep.Sport]: <SportAndActivity userProfile={userProfile} />,
    [InitialOnboardStep.StrengthTraining]: <StrengthTraining userProfile={userProfile} />,
    [InitialOnboardStep.TrainingInfo]: <TrainingInfo userProfile={userProfile} />,
    [InitialOnboardStep.SportGoal]: <SportGoal userProfile={userProfile} />,
    [InitialOnboardStep.Lifestyle]: <Lifestyle userProfile={userProfile} />,
    [InitialOnboardStep.Food]: <Food userProfile={userProfile} />,
    [InitialOnboardStep.WomenHealth]: <WomenHealth userProfile={userProfile} />,
    [InitialOnboardStep.OrgansAssessmentPrepare]: (
      <OrgansAssessmentPrepare userProfile={userProfile} />
    ),
    [InitialOnboardStep.OrgansAssessment]: <OrgansAssessment userProfile={userProfile} />,
    [InitialOnboardStep.Final]: <Final />,
  };

  const Component = componentByStep[step];

  return Component;
};
