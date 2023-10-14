export class BaseController {
  constructor(db, model) {
    this.model = new model(db);
  }

  async index(options = {}, params = { whereIn: false, fields: [] }) {
    const findMethod = params.whereIn ? "findWhereIn" : "findAll";

    try {
      const data = await this.model[findMethod](options, params) || [];
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

  async show(options, params) {
    try {
      const data = await this.model.findOne(options, params) || null;
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
