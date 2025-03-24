import { useEffect, useState } from 'react';
import { WheelItem } from '../types';
import { getSelectedIndexes } from './getSelectedIndexes';

interface Args {
  wheels: WheelItem[][];
  defaultSelectedValues: string[];
  onSubmit: (data: WheelItem[]) => void;
  onClose: () => void;
}

export const useWheelPicker = ({
  wheels,
  defaultSelectedValues,
  onSubmit,
  onClose,
}: Args) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>(() =>
    getSelectedIndexes(wheels, defaultSelectedValues)
  );

  const resetSelectedIndexes = () => {
    setSelectedIndexes(getSelectedIndexes(wheels, defaultSelectedValues));
  };

  useEffect(() => {
    resetSelectedIndexes();
  }, [defaultSelectedValues]);

  const onSelectItem = (idx: number) => (selectedIndex: number) => {
    setSelectedIndexes((prev) => {
      const newValues = [...prev];
      newValues[idx] = selectedIndex;
      return newValues;
    });
  };

  const handleSubmit = () => {
    onSubmit(
      selectedIndexes.map((selectedIdx, idx) => wheels[idx][selectedIdx])
    );
    onClose();
  };

  return {
    selectedIndexes,
    onSelectItem,
    handleSubmit,
    resetSelectedIndexes,
  };
};
