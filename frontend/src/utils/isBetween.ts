/**
 * @function
 * @description Определяет лежит ли число между двумя другими и возвращает ответ
 * @param value - Какое число нужно проверить
 * @param min - Меньше или равно которому должно быть число
 * @param max - Большое или равно которому должно быть число
 */
export const isBetween = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
