import { BaseEntity } from "./BaseEntity.js";

export class Orders extends BaseEntity {
  constructor(db) {
    super(db, 'orders');
  }
}
