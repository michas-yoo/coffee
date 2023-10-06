import { BaseEntity } from "./BaseEntity.js";

export class MenuItem extends BaseEntity {
  constructor(db) {
    super(db, 'menu_items');
  }

  findAll(options = {}) {
    const filters = this.mapKeys(options);
    const condition = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    return this.db.all(`
      SELECT name, photo, price, product_id as id
      FROM ${this.tableName}
      JOIN products ON products.id = ${this.tableName}.product_id
      ${condition}
    `);
  }

  findOne(options) {
    if (!Object.keys(options).length) {
      return null;
    }

    const filters = this.mapKeys(options).join(" AND ");
    return this.db.all(`
      SELECT products.* 
      FROM ${this.tableName}
      JOIN products ON products.id = ${this.tableName}.product_id
      WHERE ${filters}
    `);
  }
}
