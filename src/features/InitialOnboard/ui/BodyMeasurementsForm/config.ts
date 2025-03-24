const minHeight = 140;
const maxHeight = 221;

export const heightWheels = Array.from(
  { length: maxHeight - minHeight },
  (_, i) => ({
    label: `${i + minHeight}`,
    value: (i + minHeight).toString(),
  })
);

const minWeight = 40;
const maxWeight = 201;

const kilograms = Array.from({ length: maxWeight - minWeight }, (_, i) => ({
  label: `${i + minWeight}`,
  value: (i + minWeight).toString(),
}));

const grams = Array.from({ length: 10 }, (_, i) => ({
  label: `${i * 100}`,
  value: (i * 100).toString(),
}));

export const weightWheels = [kilograms, grams];
