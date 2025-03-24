import { getIsSteps } from './getIsSteps';

export const getStepsString = (steps: number) => {
  const isKilometres = !getIsSteps(steps);

  return `${steps} ${isKilometres ? 'км' : 'шагов'}`;
};
