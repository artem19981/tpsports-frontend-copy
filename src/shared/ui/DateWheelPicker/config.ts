import { getDaysInMonth } from 'date-fns';

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const generateYears = (startYear: number, endYear: number) =>
  Array.from({ length: endYear - startYear + 1 }).map((_, i) => ({
    label: (startYear + i).toString(),
    value: startYear + i,
  }));

export const generateMonths = () =>
  Array.from({ length: 12 }, (_, i) => ({
    label: capitalizeFirstLetter(
      new Date(0, i).toLocaleString('default', { month: 'long' })
    ),
    value: i + 1,
  }));

export const generateDays = (year: number, month: number) =>
  Array.from({ length: getDaysInMonth(new Date(year, month - 1)) }, (_, i) => {
    const value = i + 1;
    return { value, label: value.toString() };
  });
