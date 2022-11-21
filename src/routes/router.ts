import { Router } from "express";
import { categoriesRouter } from "./categories/categoriesRoutes.js";
import { digitalContentsRouter } from "./digitalContents/digitalContentsRoutes.js";
import { guidesRouter } from "./guides/guidesRoutes.js";

const router = Router();

router.get("/", (_, res) => res.json({ message: "Bem vindo a API DBInclui" }));
router.use("/guides", guidesRouter);
router.use("/categories", categoriesRouter);
router.use("/digital-contents", digitalContentsRouter);
router.get("*", (_, res) => res.json({ message: "Rota não encontrada" }));

export { router };
