import React, { useState, useEffect, FC } from 'react';
import { Picker } from '../WheelPicker/Picker';
import { DialogActions } from '@mui/material';
import { Button } from '../Button/Button';
import { generateDays, generateMonths, generateYears } from './config';

import styles from './DateWheelPicker.module.scss';

interface DateWheelPickerProps {
  startYear?: number;
  endYear?: number;

  defaultYear?: number;
  defaultMonth?: number;
  defaultDay?: number;

  onClose: () => void;
  onSubmit: (value: string) => void;
  onDateChange?: (date: { year: number; month: number; day: number }) => void;
}

export const DateWheelPickerContent: FC<DateWheelPickerProps> = ({
  startYear = 1900,
  endYear = new Date().getFullYear() - 1,
  defaultYear = 2000,
  defaultMonth = 5,
  defaultDay = 15,

  onClose,
  onSubmit,
  onDateChange,
}) => {
  const years = generateYears(startYear, endYear);
  const months = generateMonths();

  const [selectedYearIndex, setSelectedYearIndex] = useState(
    years.findIndex((y) => y.value === defaultYear)
  );
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    months.findIndex((m) => m.value === defaultMonth)
  );
  const [days, setDays] = useState(generateDays(defaultYear, defaultMonth));
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    days.findIndex((d) => d.value === defaultDay)
  );

  useEffect(() => {
    const newDays = generateDays(
      years[selectedYearIndex].value as number,
      months[selectedMonthIndex].value as number
    );
    setDays(newDays);

    if (selectedDayIndex >= newDays.length) {
      setSelectedDayIndex(newDays.length - 1);
    }
  }, [selectedYearIndex, selectedMonthIndex]);

  useEffect(() => {
    onDateChange?.({
      year: years[selectedYearIndex].value as number,
      month: months[selectedMonthIndex].value as number,
      day: days[selectedDayIndex].value as number,
    });
  }, [selectedYearIndex, selectedMonthIndex, selectedDayIndex, onDateChange]);

  const handleSubmit = () => {
    const selectedDate = `${String(days[selectedDayIndex].value).padStart(2, '0')}.${String(months[selectedMonthIndex].value).padStart(2, '0')}.${years[selectedYearIndex].value}`;
    onSubmit(selectedDate);
    onClose();
  };

  return (
    <>
      <div className={styles.wheels}>
        <Picker
          containerClassName={styles.picker}
          options={years}
          selectedIndex={selectedYearIndex}
          onChange={setSelectedYearIndex}
        />
        <Picker
          containerClassName={styles.picker}
          options={months}
          selectedIndex={selectedMonthIndex}
          onChange={setSelectedMonthIndex}
        />
        <Picker
          containerClassName={styles.picker}
          options={days}
          selectedIndex={selectedDayIndex}
          onChange={setSelectedDayIndex}
        />
      </div>

      <DialogActions className={styles.actions}>
        <Button className={styles.cancel} onClick={onClose}>
          отмена
        </Button>
        <Button onClick={handleSubmit}>далее</Button>
      </DialogActions>
    </>
  );
};
