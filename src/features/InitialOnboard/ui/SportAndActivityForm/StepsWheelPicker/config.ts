import { View } from './types';
import styles from './StepsWheelPicker.module.scss';
import { formatNumber } from 'shared/lib/formatter/formatNumber';

const minKm = 0;
const maxKm = 41;

export const kilometersWheels = Array.from(
  { length: maxKm - minKm },
  (_, i) => ({
    label: `${i / 2}`,
    value: (i / 2).toString(),
  })
);

const minMetres = 0;
const maxMetres = 41;

export const metresWheels = Array.from(
  { length: maxMetres - minMetres },
  (_, i) => ({
    label: formatNumber(i * 500, ' '),
    value: (i * 500).toString(),
  })
);

export const toggleButtons = [
  {
    children: 'в шагах',
    value: View.Metres,
    className: styles.toggleButton,
  },
  {
    children: 'в км',
    value: View.Kilometers,
    className: styles.toggleButton,
  },
];
