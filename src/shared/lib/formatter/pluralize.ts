export function pluralize(
  value: number,
  singular: string,
  few: string,
  many: string,
  withValue: boolean = true
): string {
  if (value === 1) {
    if (withValue) {
      return `${value} ${singular}`;
    }
    return singular;
  } else if (value > 1 && value < 5) {
    if (withValue) {
      return `${value} ${few}`;
    }
    return few;
  } else {
    if (withValue) {
      return `${value} ${many}`;
    }

    return many;
  }
}

export function pluralizeCount(
  value: number,
  singular: string,
  few: string,
  many: string
): string {
  if (value === 1) {
    return singular;
  } else if (value > 1 && value < 5) {
    return few;
  } else {
    return many;
  }
}
