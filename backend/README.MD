# Структура базы данных

## Users
Здесь хранятся данных пользователей, пароль шифруется при добавлении, а почта должна быть уникальной

| Column   | Type    | Params          |
|----------|---------|-----------------|
| id       | INTEGER | PRIMARY KEY     |
| email    | TEXT    | NOT NULL UNIQUE |
| password | TEXT    | NOT NULL        |
| name     | TEXT    | NOT NULL        |
| phone    | TEXT    | NOT NULL        |

## Products
Здесь хранятся продукты, в поле `modifier_types` хранятся id возможных модификаторов для конкретного продукта

| Column         | Type    | Params          |
|----------------|---------|-----------------|
| id             | INTEGER | PRIMARY KEY     |
| name           | TEXT    | NOT NULL UNIQUE |
| photo          | TEXT    | NOT NULL        |
| price          | TEXT    | NOT NULL        |
| modifier_types | TEXT    | NOT NULL        |

## Modifier types
Здесь хранятся модификаторы товаров, например температура, сироп и тд

| Column           | Type    | Params             |
|------------------|---------|--------------------|
| id               | INTEGER | PRIMARY KEY        |
| name             | TEXT    | NOT NULL UNIQUE    |
| multi_selectable | BOOLEAN | NOT NULL DEFAULT 0 |

## Statuses
Системная таблица для статусов заказа, переключается в панели админа

| Column | Type    | Params          |
|--------|---------|-----------------|
| id     | INTEGER | PRIMARY KEY     |
| name   | TEXT    | NOT NULL UNIQUE |

## Modifiers
Здесь хранится информация о модификаторах

| Column | Type    | Params          |
|--------|---------|-----------------|
| id     | INTEGER | PRIMARY KEY     |
| name   | TEXT    | NOT NULL UNIQUE |
| price  | INTEGER | DEFAULT 0       |
| type   | INTEGER | NOT NULL        |

Связи
- Поле `type` и `modifier_types.id`

## Shops
Здесь хранится информация о кафе

| Column     | Type    | Params      |
|------------|---------|-------------|
| id         | INTEGER | PRIMARY KEY |
| name       | TEXT    | NOT NULL    |
| geo        | TEXT    | NOT NULL    |
| open_time  | TEXT    | NOT NULL    |
| close_time | TEXT    | NOT NULL    |
| poster     | TEXT    | NOT NULL    |

## Gallery
Здесь хранится ссылки на фото кафешек для слайдера на их странице 

| Column  | Type    | Params      |
|---------|---------|-------------|
| id      | INTEGER | PRIMARY KEY |
| photo   | TEXT    | NOT NULL    |
| shop_id | INTEGER | NOT NULL    |

Связи
- Поле `shop_id` и `shops.id`

## Menu items
Здесь хранится элементы меню каждого кафе 

| Column     | Type    | Params      |
|------------|---------|-------------|
| id         | INTEGER | PRIMARY KEY |
| shop_id    | INTEGER | NOT NULL    |
| product_id | INTEGER | NOT NULL    |

Связи
- Поле `shop_id` и `shops.id`
- Поле `product_id` и `products.id`

## Orders
Здесь хранится информация о заказах пользователей 

| Column       | Type    | Params                    |
|--------------|---------|---------------------------|
| id           | INTEGER | PRIMARY KEY               |
| shop_id      | INTEGER | NOT NULL                  |
| user_id      | INTEGER | NOT NULL                  |
| modifier_ids | TEXT    |                           |
| price        | INTEGER | NOT NULL                  |
| created_at   | TEXT    | DEFAULT CURRENT_TIMESTAMP |
| status_id    | INTEGER | NOT NULL DEFAULT 1        |

Связи
- Поле `shop_id` и `shops.id`
- Поле `user_id` и `user.id`
- Поле `status_id` и `status.id`

## Ordered items
Здесь хранятся продукты из заказа

| Column     | Type    | Params      |
|------------|---------|-------------|
| id         | INTEGER | PRIMARY KEY |
| order_id   | INTEGER | NOT NULL    |
| product_id | INTEGER | NOT NULL    |
| amount     | INTEGER | NOT NULL    |
| comment    | TEXT    |             |

Связи
- Поле `order_id` и `orders.id`

## Cart
Здесь хранится корзина пользователей

| Column       | Type    | Params      |
|--------------|---------|-------------|
| id           | INTEGER | PRIMARY KEY |
| shop_id      | INTEGER | NOT NULL    |
| user_id      | INTEGER | NOT NULL    |
| product_id   | INTEGER | NOT NULL    |
| amount       | INTEGER | NOT NULL    |
| modifier_ids | TEXT    |             |
| price        | INTEGER | NOT NULL    |
| note         | TEXT    |             |

Связи
- Поле `shop_id` и `shops.id`
- Поле `user_id` и `user.id`
- Поле `product_id` и `products.id`
