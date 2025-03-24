export const deleteElementsFromArray = (
  array: string[],
  elements: string[]
) => {
  return array.filter((item) => !elements.includes(item));
};
