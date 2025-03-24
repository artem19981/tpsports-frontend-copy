export function formatNumber(number: number, separator = '.') {
  if (typeof number !== 'number') {
    throw new Error('Аргумент должен быть числом');
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
