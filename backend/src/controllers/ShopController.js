import { Shop } from "../models/Shop.js";
import { BaseController } from "./BaseController.js";

export class ShopController extends BaseController {
  constructor(db, menuController) {
    super(db, Shop, menuController);
  }
}
