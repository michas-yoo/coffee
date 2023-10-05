import { BaseEntity } from "./BaseEntity.js";

export class Products extends BaseEntity {
  constructor(db) {
    super(db, 'products');
  }
}
