import { BaseController } from "./BaseController.js";
import { Modifier } from "../models/Modifier.js";

export class ModifierController extends BaseController {
  constructor(db) {
    super(db, Modifier);
  }
}
