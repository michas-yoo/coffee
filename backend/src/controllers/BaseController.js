export class BaseController {
  constructor(db, model) {
    this.model = new model(db);
  }

  async index(options) {
    try {
      const data = await this.model.findAll(options) || [];
      return {
        ok: true,
        data,
        message: null,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        data: null,
        message: e.message,
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
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        data: null,
        message: e.message,
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
        }
      }

      return {
        ok: true,
        data: result,
        message: null,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        data: null,
        message: e.message,
      };
    }
  }
}
