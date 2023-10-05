import { Gallery } from "../models/Gallery.js";
import { BaseController } from "./BaseController.js";

export class GalleryController extends BaseController {
  constructor(db) {
    super(db, Gallery);
  }
}
