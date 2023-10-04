export class BaseEntity {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  #mapKeys(options) {
    return Object.entries(options).map(([key, value]) => `${key}="${value}"`);
  }

  findAll(options = {}) {
    const filters = this.#mapKeys(options);
    const condition = filters.length ? ` WHERE ${filters.join(" AND ")}` : "";
    return this.db.all(`SELECT * FROM ${this.tableName}${condition}`);
  }

  findOne(options) {
    if (!options.id) {
      return { error: "no id" };
    }

    const filters = this.#mapKeys(options);
    return this.db.get(`SELECT * FROM ${this.tableName} WHERE ${filters.join(" AND ")}`);
  }
}
