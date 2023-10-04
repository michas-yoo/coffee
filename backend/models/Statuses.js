import { BaseEntity } from "./BaseEntity.js";

export class Statuses extends BaseEntity {
  constructor(db) {
    super(db, 'statuses');
  }
}
