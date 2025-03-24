import { isDefined } from './is-defined';

export const toFixed = (num: number | undefined, precision = 2): string => {
  if (!isDefined(num) || isNaN(num)) {
    return '0';
  }

  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(
    precision
  );
};
