/**
 * @function
 * @description Возвращает сумму объектов по ключу
 * @param array - Массив с объектами
 * @param key - Ключ, по которому будет складываться сумма
 */
export const getSumByKey = (array: any, key: string) => {
  return array.reduce((sum: number, current: Record<string, number>) => sum + current[key], 0);
};
