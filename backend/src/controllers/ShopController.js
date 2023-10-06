import { Shop } from "../models/Shop.js";
import { BaseController } from "./BaseController.js";

export class ShopController extends BaseController {
  constructor(db, menuController, galleryController) {
    super(db, Shop);
    this.menuController = menuController;
    this.galleryController = galleryController;
  }

  async show(options) {
    const shopData = await super.show(options);
    const menu = await this.menuController.index({ shop_id: options.id });
    const gallery = await this.galleryController.index({ shop_id: options.id });

    if (menu.ok) {
      shopData.data.menu = menu.data;
    }

    if (gallery.ok) {
      shopData.data.gallery = gallery.data;
    }

    return shopData;
  }
}
