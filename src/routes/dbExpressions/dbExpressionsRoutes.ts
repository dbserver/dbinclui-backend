import { Router } from "express";
import { createDBExpressionController } from "../../controllers/dbExpressions/CreateDBExpressionController.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";
import { getAllDBExpressionsController } from "../../controllers/dbExpressions/GetAllDBExpressionController.js";
import { verifyDBExpressionsPermissionsMiddleware } from "../../middlewares/dbExpressions/verifyDBExpressionsPermissionMiddleware.js";
import { deleteLogicDBExpressionController } from "../../controllers/dbExpressions/DeleteLogicDBExpressionController.js";
import { favoriteDBExpressionController } from "../../controllers/dbExpressions/FavoriteDBExpressionController.js";

const dbExpressionsRouter = Router();

dbExpressionsRouter.post(
  "/",
  authMiddleware,
  verifyUserExistsMiddleware,
  createDBExpressionController.handler,
);

dbExpressionsRouter.get("/", getAllDBExpressionsController.handler);

//TODO
// Rota procurar por id


dbExpressionsRouter.patch(
  "/favorite/:id",
  authMiddleware,
  verifyUserExistsMiddleware,
  favoriteDBExpressionController.handler,
);

dbExpressionsRouter.patch(
  "/delete/:id",
  authMiddleware,
  verifyDBExpressionsPermissionsMiddleware,
  deleteLogicDBExpressionController.handler,
);

export { dbExpressionsRouter };
