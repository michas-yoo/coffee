import { MenuItem } from "../models/MenuItem.js";
import { BaseController } from "./BaseController.js";

export class MenuItemController extends BaseController {
  constructor(db) {
    super(db, MenuItem);
  }
}
