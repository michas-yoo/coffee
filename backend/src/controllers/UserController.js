import { User } from "../models/User.js";
import { BaseController } from "./BaseController.js";

export class UserController extends BaseController {
  constructor(db) {
    super(db, User);
  }

  async login(payload) {
    if (!payload || !Object.keys(payload).length) {
      return {
        ok: false,
        data: null,
        message: ["No login data"],
      };
    }

    return this.model.login(payload);
  }

  async register(payload) {
    if (!payload || !Object.keys(payload).length) {
      return {
        ok: false,
        data: null,
        message: ["No data to register"],
      };
    }

    return this.model.register(payload);
  }

  refreshToken(token) {
    if (!token) {
      return {
        ok: false,
        data: null,
        message: ["No token present"],
      };
    }

    return this.model.refreshToken(token);
  }
}
