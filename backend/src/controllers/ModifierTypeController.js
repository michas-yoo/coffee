import { BaseController } from "./BaseController.js";
import { ModifierType } from "../models/ModifierType.js";

export class ModifierTypeController extends BaseController {
  constructor(db) {
    super(db, ModifierType);
  }
}
