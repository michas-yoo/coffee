import { Shop } from "../models/Shop.js";
import { BaseController } from "./BaseController.js";

export class ShopController extends BaseController {
  constructor(db) {
    super(db, Shop);
  }
}
