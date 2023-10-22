export const getSumByKey = (array: any, key: string) => {
  return array.reduce((sum: number, current: Record<string, number>) => sum + current[key], 0);
};
