export class BaseController {
  constructor(db, model) {
    this.model = new model(db);
  }

  async index(options = {}, whereIn = false) {
    const findMethod = whereIn ? "findWhereIn" : "findAll";

    try {
      const data = await this.model[findMethod](options) || [];
      return {
        ok: true,
        data,
        message: null,
      };
    } catch ({ message }) {
      console.log(message);
      return {
        ok: false,
        data: null,
        message,
      };
    }
  }

  async show(options) {
    try {
      const data = await this.model.findOne(options) || null;
      return {
        ok: true,
        data,
        message: null,
      };
    } catch ({ message }) {
      console.log(message);
      return {
        ok: false,
        data: null,
        message,
      };
    }
  }

  async create(payload) {
    try {
      const result = await this.model.create(payload);

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
    } catch ({ message }) {
      console.log(message);
      return {
        ok: false,
        data: null,
        message,
      };
    }
  }

  async remove(data) {
    try {
      await this.model.remove(data);
      return {
        ok: true,
        data: null,
        message: null,
      };
    } catch ({ message }) {
      console.log(message);
      return {
        ok: false,
        data: null,
        message,
      };
    }
  }
}
