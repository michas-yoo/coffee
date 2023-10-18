import { Cart } from "../models/Cart.js";
import { BaseController } from "./BaseController.js";

export class CartController extends BaseController {
  constructor(db, { menuItemController, modifierController, shopController }) {
    super(db, Cart);
    this.menuItemController = menuItemController;
    this.modifierController = modifierController;
    this.shopController = shopController;
  }

  async show(options) {
    const cartData = await super.show(options);
    const modifiers = await this.modifierController.index({
      id: cartData.modifier_ids || "",
    }, true);

    cartData.data.modifiers = modifiers.data || [];

    return cartData;
  }

  async index(options = {}, params) {
    let cartData = await super.index(options);

    for (let item of cartData.data) {
      const modifiers = await this.modifierController.index({
        id: item.modifier_ids || "",
      }, {
        whereIn: true,
        fields: ["id", "name", "price"],
      });

      item.modifiers = modifiers.data || [];

      const product = await this.menuItemController.show({
        id: item.product_id,
      }, { noModifiers: true });

      item.product = product.data || [];

      const shop = await this.shopController.show({
        id: item.shop_id
      });

      item.shop = shop.data || {};
    }

    return cartData;
  }
}
