import { Router } from "express";
import { categoriesRouter } from "./categories/categoriesRoutes.js";
import { digitalContentsRouter } from "./digitalContents/digitalContentsRoutes.js";
import { guidesRouter } from "./guides/guidesRoutes.js";
import { userExpressionsRouter } from "./usersExpressions/usersExpressionsRoutes.js";
import { usersRouter } from "./users/usersRoutes.js";

const router = Router();

router.get("/", (_, res) => res.json({ message: "Bem vindo a API DBInclui" }));
router.use("/guides", guidesRouter);
router.use("/categories", categoriesRouter);
router.use("/digital-contents", digitalContentsRouter);
router.use("/users", usersRouter);
router.use("/usersExpressions", userExpressionsRouter);
router.get("*", (_, res) => res.json({ message: "Rota não encontrada" }));

export { router };
