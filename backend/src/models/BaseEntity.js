export class BaseEntity {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
    this.validators = {};
  }

  mapKeys(options) {
    return Object.entries(options).map(([key, value]) => {
      const keyName = key === "id" ? `${this.tableName}.id` : key;
      return `${keyName}="${value}"`;
    });
  }

  findAll(options = {}) {
    const filters = this.mapKeys(options);
    const condition = filters.length ? ` WHERE ${filters.join(" AND ")}` : "";
    return this.db.all(`SELECT * FROM ${this.tableName}${condition}`);
  }

  findWhereIn(option = {}) {
    if (!Object.keys(option).length) {
      return;
    }

    const key = Object.keys(option)[0];
    return this.db.all(`SELECT * FROM ${this.tableName} WHERE ${key} in (${option[key]})`);
  }

  findOne(options) {
    if (!Object.keys(options).length) {
      return null;
    }

    const filters = this.mapKeys(options);
    return this.db.get(`SELECT * FROM ${this.tableName} WHERE ${filters.join(" AND ")}`);
  }

  validate(data) {
    const errors = [];
    const MAX_INT = Number.MAX_SAFE_INTEGER;

    for (let [field, rules] of Object.entries(this.validators)) {
      const minValue = rules.minValue || 0;
      const maxValue = rules.maxValue || MAX_INT;
      const minLength = rules.minLength || 0;
      const maxLength = rules.maxLength || MAX_INT;

      if (!!rules.required && !data[field]) {
        errors.push(`${field} is required!`);
      }

      if (data[field].length > maxLength) {
        errors.push(`${field} is too long!`);
      }

      if (data[field].length < minLength) {
        errors.push(`${field} is too short!`);
      }

      if ((minValue || maxValue !== MAX_INT) && typeof data[field] !== "number") {
        errors.push(`${field} is not a number!`);
      }

      if (data[field] < minValue) {
        errors.push(`${field} is too small!`);
      }

      if (data[field] > maxValue) {
        errors.push(`${field} is too big!`);
      }
    }

    return errors;
  }

  async create(data, validate = true) {
    if (validate) {
      const validation = this.validate(data);

      if (validation.length) {
        return validation;
      }
    }

    const keys = Object.keys(data)
      .map((key) => {
        return key.replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase();
      }).join(", ");
    const values = Object.values(data).map((val) => `"${val}"`).join(", ");

    const result = await this.db.run(`INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`);
    return { id: result.lastID };
  }

  async remove(data) {
    const filters = this.mapKeys(data);
    const condition = filters.join(" AND ");
    return this.db.run(`DELETE FROM ${this.tableName} WHERE ${condition}`);
  }
}
