import { getGreeting } from "../src/utils/getGreeting";
import { getSumByKey } from "../src/utils/getSumByKey";
import { test, expect, describe, beforeEach, vi } from "vitest";
import { mapModifiers } from "../src/utils/mapModifiers";

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

  test("mapModifiers should map to correct object", () => {
    const rawProduct = {
      id: 0,
      name: "",
      photo: "",
      price: 0,
      product_id: 0,
      modifiers: [
        {
          id: 1,
          name: "Тёплый",
          price: 0,
          type: 1,
        },
        {
          id: 2,
          name: "Со льдом",
          price: 0,
          type: 1,
        },
      ],
      modifier_types: [
        {
          id: 1,
          name: "Температура",
          multi_selectable: 0,
        },
      ],
    };
    const mappedProduct = [{
      id: 1,
      name: "Температура",
      multipleSelect: false,
      modifiers: [
        {
          id: 1,
          name: "Тёплый",
          price: 0,
          type: 1,
        },
        {
          id: 2,
          name: "Со льдом",
          price: 0,
          type: 1,
        },
      ],
    }];

    expect(mapModifiers(rawProduct)).toEqual(mappedProduct);
  });
});
