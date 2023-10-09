import { BaseEntity } from "./BaseEntity.js";

export class Cart extends BaseEntity {
  constructor(db) {
    super(db, 'cart');
  }
}
