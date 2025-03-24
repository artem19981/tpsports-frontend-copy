import { metresWheels } from '../StepsWheelPicker/config';

export const getIsSteps = (steps: number) => {
  return (
    metresWheels.findIndex((item) => item.value === steps.toString()) !== -1
  );
};
