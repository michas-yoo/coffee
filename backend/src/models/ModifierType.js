import { BaseEntity } from "./BaseEntity.js";

export class ModifierType extends BaseEntity {
  constructor(db) {
    super(db, 'modifier_types');
  }
}
