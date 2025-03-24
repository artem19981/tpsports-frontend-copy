import { InitialOnboardStep } from '../../../model';
import { stepsData } from '../config/stepsData';

export const getStepData = (step: InitialOnboardStep, isWomen: boolean) => {
  if (step === InitialOnboardStep.Initial) {
    return null;
  }

  const stepData = stepsData[step];

  if (step === InitialOnboardStep.OrgansAssessmentPrepare) {
    return isWomen
      ? {
          ...stepData,
          prevPage: `/initial-onboard?step=${InitialOnboardStep.WomenHealth}`,
        }
      : stepData;
  }

  return stepData;
};
