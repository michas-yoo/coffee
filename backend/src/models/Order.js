import { BaseEntity } from "./BaseEntity.js";

export class Order extends BaseEntity {
  constructor(db) {
    super(db, "orders");
    this.validators = {
      id: { required: true },
      shop_id: { required: true },
      user_id: { required: true },
      modifier_ids: { required: true },
      price: { required: true },
    };
  }

  async findAll(options = {}, params = {}) {
    const orders = await this.db.all(`
      SELECT ${this.tableName}.*, statuses.name as status FROM ${this.tableName}
      JOIN statuses ON statuses.id = status_id
    `);

    for (const order of orders) {
      // TODO: add item info
      order.items = await this.db.all(`
        SELECT * FROM ordered_items
        WHERE order_id = '${order.id}'
      `);
    }

    return orders;
  }

  async create(data, validate = true) {
    if (!data.cart.length) {
      throw new Error("No items in cart!");
    }

    const { shop_id, user_id } = data.cart[0];

    const order = await this.db.run(`
      INSERT INTO ${this.tableName} (shop_id, user_id, price)
      VALUES (${shop_id}, ${user_id}, ${data.total})
    `);

    const orderId = order.lastID;

    for (const item of data.cart) {
      const { product_id, modifier_ids, amount, comment } = item;
      await this.db.run(`
        INSERT INTO ordered_items (order_id, product_id, modifier_ids, amount, comment)
        VALUES (${orderId}, ${product_id}, "${modifier_ids}", ${amount}, "${comment}")
      `);
    }

    return { id: orderId };
  }
}
