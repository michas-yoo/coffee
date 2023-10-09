import { Cart } from "../models/Cart.js";
import { BaseController } from "./BaseController.js";

export class CartController extends BaseController {
  constructor(db, modifierController) {
    super(db, Cart);
    this.modifierController = modifierController;
  }

  async show(options) {
    const cartData = await super.show(options);
    const modifiers = await this.modifierController.index({
      id: cartData.modifier_ids || ""
    }, true);

    if (modifiers.ok) {
      cartData.data.modifiers = modifiers.data;
    }

    return cartData;
  }
}
