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

  async findOne(options, params = {}) {
    if (!Object.keys(options).length) {
      return null;
    }

    const order = await this.db.get(`
      SELECT ${this.tableName}.*, name, geo FROM ${this.tableName}
      JOIN shops on shops.id = ${this.tableName}.shop_id
      WHERE ${this.tableName}.id = ${options.id}
    `);

    const products = await this.db.all(`
      SELECT ordered_items.id AS id, amount, comment, name, photo, price, modifier_ids
      FROM ordered_items
      JOIN products ON products.id = product_id 
      WHERE order_id = ${order.id}
    `);

    order.items = products.map((product) => ({
      amount: product.amount,
      comment: product.comment,
      modifiers: product.modifiers,
      modifier_ids: product.modifier_ids,
      product: {
        name: product.name,
        photo: product.photo,
        price: product.price,
      },
    }));

    for (let item of order.items) {
      item.modifiers = await this.db.all(`
        SELECT * FROM modifiers
        WHERE id IN (${item.modifier_ids})
      `);
    }

    return order;
  }

  async findAll(options = {}, params = {}) {
    const orders = await this.db.all(`SELECT * FROM ${this.tableName}`);

    for (const order of orders) {
      order.items = await this.db.all(`
        SELECT ordered_items.*, photo, name FROM ordered_items
        JOIN products on ordered_items.product_id = products.id
        WHERE order_id = '${order.id}'
      `);

      order.shop = await this.db.get(`
        SELECT name, geo FROM shops
        WHERE id = '${order.shop_id}'
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
