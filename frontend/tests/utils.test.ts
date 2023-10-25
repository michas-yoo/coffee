import { getGreeting } from "../src/utils/getGreeting";
import { getSumByKey } from "../src/utils/getSumByKey";
import { test, expect, describe, beforeEach, vi } from "vitest";

describe("Utils", () => {
  type PartOfDay = "morning" | "day" | "evening" | "night";
  type Message = Record<PartOfDay, string>

  const messages: Message = {
    morning: "Доброе утро 🌤️",
    day: "Добрый день 🌞",
    evening: "Добрый вечер 🌚",
    night: "Доброй ночи 🌝",
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  test("getGreeting should return correct message at 09:00", () => {
    const date: Date = new Date(2000, 1, 1, 9);
    vi.setSystemTime(date);

    expect(getGreeting()).toBe(messages.morning);
  });

  test("getGreeting should return correct message at 13:00", () => {
    const date: Date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);

    expect(getGreeting()).toBe(messages.day);
  });

  test("getGreeting should return correct message at 19:00", () => {
    const date: Date = new Date(2000, 1, 1, 19);
    vi.setSystemTime(date);

    expect(getGreeting()).toBe(messages.evening);
  });

  test("getGreeting should return correct message at 23:00", () => {
    const date: Date = new Date(2000, 1, 1, 23);
    vi.setSystemTime(date);

    expect(getGreeting()).toBe(messages.night);
  });

  test("getSumByKey returns 0 if array is empty", () => {
    expect(getSumByKey([], "price")).toBe(0);
  });

  test("getSumByKey returns 0 if objects have price", () => {
    expect(getSumByKey([
      { price: 10 },
      { price: 20 },
    ], "price")).toBe(30);
  });
});
