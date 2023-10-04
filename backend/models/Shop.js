import { BaseEntity } from "./BaseEntity.js";

export class Shop extends BaseEntity {
  constructor(db) {
    super(db, 'shops');
  }
}
