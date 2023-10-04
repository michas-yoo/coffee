import { BaseEntity } from "./BaseEntity.js";

export class Modifier extends BaseEntity {
  constructor(db) {
    super(db, 'modifiers');
  }
}
