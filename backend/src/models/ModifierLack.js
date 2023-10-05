import { BaseEntity } from "./BaseEntity.js";

export class ModifierLack extends BaseEntity {
  constructor(db) {
    super(db, 'modifier_lacks');
  }
}
