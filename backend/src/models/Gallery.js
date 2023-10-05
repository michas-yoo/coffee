import { BaseEntity } from "./BaseEntity.js";

export class Gallery extends BaseEntity {
  constructor(db) {
    super(db, 'gallery');
  }
}
