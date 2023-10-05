import { Order } from "../models/Order.js";
import { BaseController } from "./BaseController.js";

export class OrderController extends BaseController {
  constructor(db) {
    super(db, Order);
  }
}
