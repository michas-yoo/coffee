import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { UserController } from "./src/controllers/UserController.js";
import { ShopController } from "./src/controllers/ShopController.js";
import { CartController } from "./src/controllers/CartController.js";
import { OrderController } from "./src/controllers/OrderController.js";
import { GalleryController } from "./src/controllers/GalleryController.js";
import { MenuItemController } from "./src/controllers/MenuItemController.js";
import { ModifierController } from "./src/controllers/ModifierController.js";
import { ModifierTypeController } from "./src/controllers/ModifierTypeController.js";
import { SEVEN_DAYS, REFRESH_COOKIE_NAME } from "./src/utils/constants.js";
import { addDefaultData, openDB, printToConsole, setupTables } from "./src/db/db.js";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URLS_WITHOUT_AUTH = ["/", "/login", "/register", "/refresh_token"];

function processResultWithCookie(result, res, req = {}) {
  if (result.cookie && !req.cookies?.[REFRESH_COOKIE_NAME]) {
    res.cookie(REFRESH_COOKIE_NAME, result.cookie, {
      httpOnly: true,
      // path: "http://localhost:3000/refresh_token",
      maxAge: SEVEN_DAYS,
    });
  }
  delete result.cookie;
}

(async () => {
  const db = await openDB();
  const userController = new UserController(db);
  const orderController = new OrderController(db);
  const galleryController = new GalleryController(db);
  const modifierController = new ModifierController(db);
  const menuItemController = new MenuItemController(db);
  const modifierTypeController = new ModifierTypeController(db);

  const shopController = new ShopController(db, menuItemController, galleryController);
  const cartController = new CartController(db, modifierController);

  await setupTables(db);
  await addDefaultData(db);
  printToConsole(db, false);

  app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }));

  // Auth token interceptor
  app.use((req, res, next) => {
    const noNeedForAuth = URLS_WITHOUT_AUTH.includes(req.originalUrl);
    if (noNeedForAuth || req.originalUrl.match(/static|ref/gi)) return next();

    const authorization = req.headers["authorization"] || "";

    if (!authorization) {
      return res.status(401).json({ ok: false, message: ["No token in headers"] });
    }

    try {
      const token = authorization.split(" ")[1];
      req.payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ ok: false, message: ["Bad token"] });
    }

    return next();
  });

  app.use(cookieParser(), bodyParser.json());

  app.use("/static", express.static(path.join(__dirname, "static")));

  // === GET REQUESTS ===

  app.get("/", async (req, res) => {
    res.send("Hello world");
  });

  app.get("/refresh_token", async (req, res) => {
    res.send("Hello world");
  });

  app.get("/shops", async (req, res) => {
    const result = await shopController.index();
    console.log(result);
    res.json(result);
  });

  app.get("/shops/:id", async (req, res) => {
    const { id } = req.params;
    const result = await shopController.show({ id });
    res.json(result);
  });

  app.get("/modifiers", async (req, res) => {
    const result = await modifierController.index();
    res.json(result);
  });

  app.get("/modifier_types", async (req, res) => {
    const result = await modifierTypeController.index();
    res.json(result);
  });

  app.get("/gallery/:id", async (req, res) => {
    const { id } = req.params;
    const result = await galleryController.index({ shop_id: id });
    res.json(result);
  });

  app.get("/menu/:id", async (req, res) => {
    const { id } = req.params;
    const result = await menuItemController.index({ shop_id: id });
    res.json(result);
  });

  app.get("/menu/:shopId/:id", async (req, res) => {
    const { id, shopId } = req.params;
    const result = await menuItemController.show({ id, shop_id: shopId });
    res.json(result);
  });

  app.get("/orders", async (req, res) => {
    const { id } = req.payload;
    const result = await orderController.index({ user_id: id });
    res.json(result);
  });

  app.get("/orders/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.payload.id;
    const result = await orderController.show({ id, user_id: userId });
    res.json(result);
  });

  app.get("/cart", async (req, res) => {
    const { id } = req.payload;
    const result = await cartController.index({ user_id: id });
    res.json(result);
  });

  // === POST REQUESTS ===

  app.post("/register", async (req, res) => {
    const result = await userController.register(req.body);
    res.json(result);
  });

  app.post("/login", async (req, res) => {
    const result = await userController.login(req.body);
    processResultWithCookie(result, res);

    res.json(result);
  });

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    const result = await userController.refreshToken(token);
    processResultWithCookie(result, res, req);

    res.json(result);
  });

  app.post("/cart", async (req, res) => {
    const { id } = req.payload;
    const result = await cartController.create({
      user_id: id,
      ...req.body,
    });

    res.json(result);
  });

  // === DELETE REQUESTS ===
  app.delete("/cart", async (req, res) => {
    const { id } = req.payload;
    const result = await cartController.remove({
      user_id: id,
      ...req.params,
    });

    res.json(result);
  });

  app.listen(port, () => {
    console.log(`Coffee app backend started on port ${port}`);
  });
})();

