import {open} from 'sqlite';
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

export async function setupTables(db) {
  await db.exec(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  await db.exec(`CREATE TABLE products (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    photo TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    can_be_iced BOOLEAN NOT NULL DEFAULT 0,
    has_modifiers BOOLEAN NOT NULL DEFAULT 1,
    modifier_types TEXT
  )`);

  await db.exec(`CREATE TABLE modifier_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`);

  await db.exec(`CREATE TABLE statuses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )`);

  await db.exec(`CREATE TABLE modifiers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    type INTEGER NOT NULL,
    FOREIGN KEY (type)
        REFERENCES modifier_types (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE shops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    geo TEXT NOT NULL,
    open_time TEXT NOT NULL,
    close_time TEXT NOT NULL,
    poster TEXT NOT NULL
  )`);

  await db.exec(`CREATE TABLE modifier_lacks (
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

  await db.exec(`CREATE TABLE gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo TEXT NOT NULL,
    shop_id INTEGER NOT NULL,
    FOREIGN KEY (shop_id)
        REFERENCES shops (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);

  await db.exec(`CREATE TABLE menu_items (
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

  await db.exec(`CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    comment TEXT,
    modifier_ids TEXT,
    price INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    status_id INTEGER NOT NULL,
    FOREIGN KEY (shop_id)
        REFERENCES shops (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (status_id)
        REFERENCES statuses (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`);
}

export async function addDefaultData(db) {
  const photo = "https://i-coffee.me/wp-content/uploads/2021/12/%D1%8D%D1%81%D0%BF%D1%80%D0%B5%D1%81%D1%81%D0%BE.jpg";

  await db.run(`INSERT INTO users VALUES (null, 'a@a.ru', 'a@a.ru')`);

  await db.run(`INSERT INTO modifier_types VALUES (null, 'Размер')`);
  await db.run(`INSERT INTO modifier_types VALUES (null, 'Молоко')`);
  await db.run(`INSERT INTO modifier_types VALUES (null, 'Сироп')`);
  await db.run(`INSERT INTO modifier_types VALUES (null, 'Топпинг')`);

  await db.run(`INSERT INTO modifiers VALUES (null, 'S', 0, 1)`);
  await db.run(`INSERT INTO modifiers VALUES (null, 'M', 20, 1)`);
  await db.run(`INSERT INTO modifiers VALUES (null, 'Кокосовое', 30, 2)`);
  await db.run(`INSERT INTO modifiers VALUES (null, 'Миндальный', 40, 3)`);

  await db.run(`INSERT INTO products VALUES (
    null, 'Латте', "${photo}",
    69, 1, 1, '1,2,3'
  )`);

  await db.run(`INSERT INTO shops VALUES (
    null, 'КофеМыш', '59.234/79.112',
    '09:00', '21:00', '${photo}'
  )`);
  await db.run(`INSERT INTO shops VALUES (
    null, 'КофеПёс', '11.11/22.22',
    '09:00', '21:00', '${photo}'
  )`);
}

export function printToConsole(db, print) {
  if (!print) return;

  tableNames.forEach(async (name) => {
    const data = await db.get(`SELECT * FROM '${name}'`);
    console.log(data);
  });
}

export async function openDB() {
  return open({
    filename: ':memory:',
    driver: sqlite3.Database
  })
}
