import { Modifier } from "../models/Modifier.js";
import { BaseController } from "./BaseController.js";

export class ModifierController extends BaseController {
  constructor(db) {
    super(db, Modifier);
  }
}
