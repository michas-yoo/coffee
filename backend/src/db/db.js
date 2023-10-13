import { open } from "sqlite";
import sqlite3 from "sqlite3";

const tableNames = [
  "users",
  "shops",
  "orders",
  "gallery",
  "products",
  "statuses",
  "modifiers",
  "menu_items",
  "modifier_lacks",
  "modifier_types",
];

const allModifiers = new Array(20).fill("").map((_, i) => i + 1).join(",");

export async function setupTables(db) {
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    photo TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    can_be_iced BOOLEAN NOT NULL DEFAULT 0,
    modifier_types TEXT
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS modifier_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    multi_selectable BOOLEAN DEFAULT 0
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS statuses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS modifiers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    type INTEGER NOT NULL,
    FOREIGN KEY (type)
        REFERENCES modifier_types (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS shops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    geo TEXT NOT NULL,
    open_time TEXT NOT NULL,
    close_time TEXT NOT NULL,
    poster TEXT NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS modifier_lacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    modifier_id INTEGER NOT NULL,
    FOREIGN KEY (shop_id)
        REFERENCES shops (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (modifier_id)
        REFERENCES modifiers (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo TEXT NOT NULL,
    shop_id INTEGER NOT NULL,
    FOREIGN KEY (shop_id)
        REFERENCES shops (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (shop_id)
        REFERENCES shops (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    modifier_ids TEXT,
    price INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    status_id INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (shop_id)
        REFERENCES shops (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (status_id)
        REFERENCES statuses (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS ordered_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    comment TEXT,
    FOREIGN KEY (order_id)
        REFERENCES orders (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    modifier_ids TEXT,
    price INTEGER NOT NULL,
    note TEXT,
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (shop_id)
        REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);
}

export async function addDefaultData(db) {
  // Run migrations only for the first time
  const dataInDB = await db.get(`SELECT COUNT(*) as count FROM statuses`);
  if (dataInDB.count) {
    return;
  }

  try {
    await db.run(`INSERT INTO statuses VALUES (null, "pending")`);
    await db.run(`INSERT INTO statuses VALUES (null, "in_progress")`);
    await db.run(`INSERT INTO statuses VALUES (null, "ready")`);
    await db.run(`INSERT INTO statuses VALUES (null, "done")`);

    await db.run(`INSERT INTO modifier_types VALUES (null, "Температура", 0)`);
    await db.run(`INSERT INTO modifier_types VALUES (null, "Размер", 0)`);
    await db.run(`INSERT INTO modifier_types VALUES (null, "Молоко", 0)`);
    await db.run(`INSERT INTO modifier_types VALUES (null, "Сироп", 1)`);
    await db.run(`INSERT INTO modifier_types VALUES (null, "Топпинг", 1)`);

    await db.run(`INSERT INTO modifiers VALUES (null, "Тёплый", 0, 1)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Со льдом", 0, 1)`);

    await db.run(`INSERT INTO modifiers VALUES (null, "S", 0, 2)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "M", 20, 2)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "L", 30, 2)`);

    await db.run(`INSERT INTO modifiers VALUES (null, "Коровье, 2.5%", 0, 3)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Соевое", 30, 3)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Кокосовое", 30, 3)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Миндальное", 30, 3)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Обезжиренное", 20, 3)`);

    await db.run(`INSERT INTO modifiers VALUES (null, "Пекан", 20, 4)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Ваниль", 20, 4)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Карамель", 20, 4)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Дикая мята", 20, 4)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Айриш крим", 20, 4)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Лесной орех", 20, 4)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Соленая карамель", 20, 4)`);

    await db.run(`INSERT INTO modifiers VALUES (null, "Корица", 20, 5)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Какао", 20, 5)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Морская соль", 20, 5)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Шоколадная крошка", 20, 5)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Крошка из печенья", 20, 5)`);
    await db.run(`INSERT INTO modifiers VALUES (null, "Карамельный соус", 20, 5)`);

    await db.run(`INSERT INTO products VALUES (
    null, "Классика", "http://localhost:3000/static/cup_1.png",
    69, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Мятная свежесть", "http://localhost:3000/static/cup_2.png",
    79, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Малиновый латте", "http://localhost:3000/static/cup_3.png",
    89, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Дымный эспрессо", "http://localhost:3000/static/cup_4.png",
    69, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Черничное наслаждение", "http://localhost:3000/static/cup_5.png",
    79, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Солнечный латте", "http://localhost:3000/static/cup_6.png",
    89, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Ягодный бум", "http://localhost:3000/static/cup_7.png",
    89, 1, "${allModifiers}"
  )`);
    await db.run(`INSERT INTO products VALUES (
    null, "Океанский бриз", "http://localhost:3000/static/cup_8.png",
    79, 1, "${allModifiers}"
  )`);

    await db.run(`INSERT INTO shops VALUES (
    null, "Кафе «Сокол»", "55.8052135 37.5164965", "09:00", "21:00", 
    "http://localhost:3000/static/shop_1.png"
  )`);
    await db.run(`INSERT INTO shops VALUES (
    null, "Кафе «Беговая»", "55.773735 37.5443432", "09:00", "21:00", 
    "http://localhost:3000/static/shop_2.png"
  )`);
    await db.run(`INSERT INTO shops VALUES (
    null, "Кафе «1905» года", "55.7655558 37.5594906", "09:00", "21:00", 
    "http://localhost:3000/static/shop_3.png"
  )`);
    await db.run(`INSERT INTO shops VALUES (
    null, "Кафе «Войковская»", "55.8052135 37.5164965", "09:00", "21:00", 
    "http://localhost:3000/static/shop_4.png"
  )`);
    await db.run(`INSERT INTO shops VALUES (
    null, "Кафе «Белорусская»", "55.7781197 37.57902", "09:00", "21:00", 
    "http://localhost:3000/static/shop_5.png"
  )`);
    await db.run(`INSERT INTO shops VALUES (
    null, "Кафе «Китай»-город", "55.7580277 37.6346813", "09:00", "21:00", 
    "http://localhost:3000/static/shop_6.png"
  )`);

    await db.run(`INSERT INTO menu_items VALUES (null, 1, 1)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 2)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 3)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 4)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 5)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 6)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 7)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 1, 8)`);

    await db.run(`INSERT INTO menu_items VALUES (null, 2, 1)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 2, 2)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 2, 3)`);

    await db.run(`INSERT INTO menu_items VALUES (null, 3, 4)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 3, 5)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 3, 6)`);

    await db.run(`INSERT INTO menu_items VALUES (null, 4, 6)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 4, 7)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 4, 8)`);

    await db.run(`INSERT INTO menu_items VALUES (null, 5, 1)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 5, 3)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 5, 5)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 5, 7)`);

    await db.run(`INSERT INTO menu_items VALUES (null, 6, 2)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 6, 4)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 6, 6)`);
    await db.run(`INSERT INTO menu_items VALUES (null, 6, 8)`);
  } catch (e) {
    console.log('Error while creating DB:', e);
  }
}

export function printToConsole(db, print) {
  if (!print) return;

  tableNames.forEach(async (name) => {
    const data = await db.get(`SELECT * FROM "${name}"`);
    console.log(data);
  });
}

export async function openDB() {
  return open({
    filename: "./src/db/mainDB.db",
    driver: sqlite3.Database,
  });
}
