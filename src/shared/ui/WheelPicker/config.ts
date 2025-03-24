export const opacityByIndexForNineItems: Record<string, number> = {
  '1': 0.3,
  '2': 0.3,
  '3': 0.1,
  '4': 0.05,
};

export const opacityByIndexForSevenItems: Record<string, number> = {
  '1': 0.3,
  '2': 0.3,
  '3': 0.1,
};

export const opacityByIndexForFiveItems: Record<string, number> = {
  '1': 0.3,
  '2': 0.1,
};

export const getOpacityForItem = (distance: number, itemsCount: number) => {
  if (distance === 0) {
    return 1;
  }

  if (itemsCount === 5) {
    return opacityByIndexForFiveItems[distance.toString()] || 0.1;
  }

  if (itemsCount === 7) {
    return opacityByIndexForSevenItems[distance.toString()] || 0.1;
  }

  if (itemsCount === 9) {
    return opacityByIndexForNineItems[distance.toString()] || 0.05;
  }

  return 1 - distance * 0.35;
};
