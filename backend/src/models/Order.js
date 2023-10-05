import { BaseEntity } from "./BaseEntity.js";

export class Order extends BaseEntity {
  constructor(db) {
    super(db, 'orders');
  }
}
