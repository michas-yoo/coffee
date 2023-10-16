export const getSumByKey = (array, key) => {
  return array.reduce((sum, current) => sum + current[key], 0);
}
