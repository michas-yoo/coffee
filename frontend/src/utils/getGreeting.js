import { isBetween } from "./isBetween.js";

export function getGreeting() {
  const currentHour = new Date().getHours();

  // От 4 до 11 – утро
  if (isBetween(currentHour, 4, 11)) {
    return "Доброе утро 🌤️";
  }

  // С 22х и до 3х – ночь
  if (isBetween(currentHour, 0, 3) || currentHour >= 22) {
    return "Доброй ночи 🌝";
  }

  if (isBetween(currentHour, 17, 21)) {
    return "Добрый вечер 🌚";
  }

  // Всё остальное – день
  return "Добрый день 🌞";
}
