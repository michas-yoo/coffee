export class BaseEntity {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
    this.validators = {};
  }

  mapKeys(options) {
    return Object.entries(options).map(([key, value]) => {
      const keyName = key === 'id' ? `${this.tableName}.id` : key;
      return `${keyName}="${value}"`;
    });
  }

  findAll(options = {}) {
    const filters = this.mapKeys(options);
    const condition = filters.length ? ` WHERE ${filters.join(" AND ")}` : "";
    return this.db.all(`SELECT * FROM ${this.tableName}${condition}`);
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
        break;
      }

      if (data[field].length > maxLength) {
        errors.push(`${field} is too long!`);
        break;
      }

      if (data[field].length < minLength) {
        errors.push(`${field} is too short!`);
        break;
      }

      if ((minValue || maxValue !== MAX_INT) && typeof data[field] !== "number") {
        errors.push(`${field} is not a number!`);
        break;
      }

      if (data[field] < minValue) {
        errors.push(`${field} is too small!`);
        break;
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

    const keys = Object.keys(data).join(", ");
    const values = Object.values(data).map((val) => val ? `"${val}"` : val).join(", ");

    const result = await this.db.run(`INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`);
    return { id: result.lastID };
  }
}
