import { BaseEntity } from "./BaseEntity.js";

export class User extends BaseEntity {
  constructor(db) {
    super(db, "users");
  }

  login(data) {
    console.log("login", data);
  }

  register(data) {
    console.log("register", data);
  }
}
