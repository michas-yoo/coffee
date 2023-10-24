import { isBetween } from "./isBetween";

/**
 * @function
 * @description Возвращает приветствие в зависимости от времени суток
 * @returns {string} Строка с приветствием
 */
export function getGreeting(): string {
  const currentHour: number = new Date().getHours();

  // От 4 до 11 – утро
  if (isBetween(currentHour, 4, 11)) {
    return "Доброе утро 🌤️";
  }

  // С 22х и до 3х – ночь
  if (isBetween(currentHour, 0, 3) || currentHour >= 22) {
    return "Доброй ночи 🌝";
  }

  // С 17 до 21 – вечер
  if (isBetween(currentHour, 17, 21)) {
    return "Добрый вечер 🌚";
  }

  // Всё остальное – день
  return "Добрый день 🌞";
}
