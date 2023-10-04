export class BaseController {
  constructor(db, model) {
    this.model = new model(db);
  }

  index() {
    return this.model.findAll();
  }

  view(options) {
    return this.model.findOne(options);
  }
}
