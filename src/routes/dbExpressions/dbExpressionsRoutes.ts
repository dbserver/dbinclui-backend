import { Router } from "express";
import { createDBExpressionController } from "../../controllers/dbExpressions/CreateDBExpressionController.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";
import { getAllDBExpressionsController } from "../../controllers/dbExpressions/GetAllDBExpressionController.js";

const dbExpressionsRouter = Router();

dbExpressionsRouter.post(
  "/",
  authMiddleware,
  verifyUserExistsMiddleware,
  createDBExpressionController.handler,
);

dbExpressionsRouter.get("/", getAllDBExpressionsController.handler);

export { dbExpressionsRouter };
