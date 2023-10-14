import { BaseEntity } from "./BaseEntity.js";

export class MenuItem extends BaseEntity {
  constructor(db) {
    super(db, 'menu_items');
  }

  findAll(options = {}, params = {}) {
    const filters = this.mapKeys(options);
    const fields = params?.fields?.join(', ') || `${this.tableName}.id as id, name, photo, price, product_id`;
    const condition = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    return this.db.all(`
      SELECT ${fields}
      FROM ${this.tableName}
      JOIN products ON products.id = ${this.tableName}.product_id
      ${condition}
    `);
  }

  async findOne(options, params = {}) {
    if (!Object.keys(options).length) {
      return null;
    }

    const filters = this.mapKeys(options).join(" AND ");
    const data = await this.db.get(`
      SELECT products.*, ${this.tableName}.id as id
      FROM ${this.tableName}
      JOIN products ON products.id = ${this.tableName}.product_id
      WHERE ${filters}
    `);

    if (!data) return data;

    if (params?.noModifiers) {
      return data;
    }

    const modifier_types = await this.db.all(`
      SELECT * FROM modifier_types
      WHERE id in (${data.modifier_types})
    `);

    const modifiers = await this.db.all(`
      SELECT * FROM modifiers
      WHERE id IN (${data.modifier_types})
    `);

    return {
      ...data,
      modifiers,
      modifier_types,
    };
  }
}
