import { WheelItem } from '../types';

export const getSelectedIndexes = (
  wheels: WheelItem[][],
  defaultSelectedValues: string[]
) =>
  wheels.map(
    (wheel, idx) =>
      wheel.findIndex((item) => item.value === defaultSelectedValues[idx]) || 0
  );
