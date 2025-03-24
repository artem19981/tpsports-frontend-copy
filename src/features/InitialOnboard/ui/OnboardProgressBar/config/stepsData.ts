import { InitialOnboardStep } from '../../../model';

type ExcludedSteps = Exclude<InitialOnboardStep, InitialOnboardStep.Initial>;

export const stepsData: Record<
  ExcludedSteps,
  { prevPage: string; value: number }
> = {
  [InitialOnboardStep.PersonalInfo]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.Initial}`,
    value: getStepValue(2),
  },
  [InitialOnboardStep.BodyMeasurement]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.PersonalInfo}`,
    value: getStepValue(3),
  },
  [InitialOnboardStep.Sport]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.BodyMeasurement}`,
    value: getStepValue(4),
  },
  [InitialOnboardStep.StrengthTraining]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.Sport}`,
    value: getStepValue(5),
  },
  [InitialOnboardStep.TrainingInfo]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.StrengthTraining}`,
    value: getStepValue(7),
  },
  [InitialOnboardStep.SportGoal]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.TrainingInfo}`,
    value: getStepValue(6),
  },
  [InitialOnboardStep.Lifestyle]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.SportGoal}`,
    value: getStepValue(8),
  },
  [InitialOnboardStep.Food]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.Lifestyle}`,
    value: getStepValue(9),
  },
  [InitialOnboardStep.WomenHealth]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.Food}`,
    value: getStepValue(10),
  },
  [InitialOnboardStep.OrgansAssessmentPrepare]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.Food}`,
    value: getStepValue(11),
  },
  [InitialOnboardStep.OrgansAssessment]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.OrgansAssessmentPrepare}`,
    value: getStepValue(12),
  },
  [InitialOnboardStep.Final]: {
    prevPage: `/initial-onboard?step=${InitialOnboardStep.OrgansAssessment}`,
    value: getStepValue(13),
  },
};

function getStepValue(stepValue: number) {
  return (100 / 13) * stepValue;
}
