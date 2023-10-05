import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { BaseEntity } from "./BaseEntity.js";
import { createRefreshToken, createAccessToken } from "../utils/auth.js";

export class User extends BaseEntity {
  constructor(db) {
    super(db, "users");
    this.validators = {
      email: {
        required: true,
      },
      password: {
        required: true,
        minLength: 3,
      },
    };
  }

  async login({ email, password }) {
    const user = await this.findOne({ email });

    if (!user) {
      return {
        ok: false,
        data: null,
        message: ["User not found"],
      };
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return {
        ok: false,
        data: null,
        message: ["Invalid password"],
      };
    }

    return {
      ok: true,
      data: {
        id: user.id,
        accessToken: createAccessToken(user.id),
      },
      message: null,
      cookie: createRefreshToken(user.id),
    };
  }

  async register({ email, password }) {
    const validation = this.validate({ email, password });

    if (validation.length) {
      return {
        ok: false,
        data: null,
        message: validation,
      };
    }

    const hashedPassword = await hash(password, 12);
    try {
      const result = await this.create({ email, password: hashedPassword }, false);

      if (Array.isArray(result)) {
        return {
          ok: false,
          data: null,
          message: result,
        };
      }

      return {
        ok: true,
        data: result,
        message: null,
      };
    } catch (e) {
      console.log(e);
      let { message } = e;
      const isUniqueError = message.includes("UNIQUE");

      if (isUniqueError) {
        const field = message.split("failed:")[1].split(".")[1];
        message = `Such ${field} already exits!`;
      }

      return {
        ok: false,
        data: null,
        message: [message],
      };
    }
  }

  async refreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const user = await this.findOne({ id: payload.id });

      if (!user) {
        return {
          ok: false,
          data: null,
          message: ["User not found"],
        };
      }

      return {
        ok: true,
        data: {
          accessToken: createAccessToken(user.id),
        },
        cookie: createRefreshToken(user.id),
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        data: null,
        message: [e.message],
      };
    }
  }
}
