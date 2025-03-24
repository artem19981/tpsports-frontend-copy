export const getSelectedWeight = (weight: number) => {
  const [kilograms, grams] = weight.toString().split('.');

  return { kilograms, grams: grams ? (+grams * 100).toString() : '0' };
};
