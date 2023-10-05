import { BaseEntity } from "./BaseEntity.js";

export class Shop extends BaseEntity {
  constructor(db, menuController) {
    super(db, 'shops');
    this.menuController = menuController;
  }

  async findOne(options) {
    const shopData = await super.findOne(options);
    const menu = await this.menuController.index({ shop_id: options.id });

    if (menu.ok) {
      shopData.menu = menu.data;
    }

    return shopData;
  }
}
