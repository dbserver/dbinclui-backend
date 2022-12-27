import { Router } from "express";
import { createDBExpressionController } from "../../controllers/dbExpressions/CreateDBExpressionController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";

const dbExpressionsRouter = Router();

dbExpressionsRouter.post("/", validateTokenAccessMiddleware, verifyUserExistsMiddleware, createDBExpressionController.handler );

export { dbExpressionsRouter };