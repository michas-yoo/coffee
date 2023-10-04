import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { addDefaultData, openDB, printToConsole, setupTables } from "./db.js";
import { ShopController } from "./controllers/ShopController.js";
import { ModifierController } from "./controllers/ModifierController.js";
import { ModifierTypeController } from "./controllers/ModifierTypeController.js";

const app = express();
const port = 3000;

(async () => {
  const db = await openDB();
  const shopController = new ShopController(db);
  const modifierController = new ModifierController(db);
  const modifierTypeController = new ModifierTypeController(db);

  await setupTables(db);
  await addDefaultData(db);
  printToConsole(db, false);

  app.use(
    cookieParser(),
    bodyParser.json(),
  );

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/get_shops", async (req, res) => {
    const result = await shopController.index();
    res.json(result);
  });

  app.get("/get_shop/:id", async (req, res) => {
    const { id } = req.params;
    const result = await shopController.view({ id });
    res.json(result);
  });

  app.get("/get_modifiers", async (req, res) => {
    const result = await modifierController.index();
    res.json(result);
  });

  app.get("/get_modifier_types", async (req, res) => {
    const result = await modifierTypeController.index();
    res.json(result);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();

