import { Router } from "express";
import { createUserExpressionController } from "../../controllers/usersExpressions/CreateUserExpressionController.js";
import { getAllByIdUserExpressionsController } from "../../controllers/usersExpressions/GetAllByIdUserExpressionsController.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";
import { deleteUserExpressionsController } from "../../controllers/usersExpressions/DeleteUserExpressionsController.js";
import { verifyUserExpressionsPermissionsMiddleware } from "../../middlewares/usersExpressions/verifyUserPermissionMiddleware.js";
import { favoriteUserExpressionController } from "../../controllers/usersExpressions/FavoriteUserExpressionController.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";

const userExpressionsRouter = Router();

userExpressionsRouter.post(
  "/",
  authMiddleware,
  verifyUserExistsMiddleware,
  createUserExpressionController.handler,
);

userExpressionsRouter.patch(
  "/favorite/:id",
  authMiddleware,
  verifyUserExpressionsPermissionsMiddleware,
  favoriteUserExpressionController.handler,
);

userExpressionsRouter.get(
  "/",
  authMiddleware,
  verifyUserExistsMiddleware,
  getAllByIdUserExpressionsController.handler,
);

userExpressionsRouter.delete(
  "/:id",
  authMiddleware,
  verifyUserExpressionsPermissionsMiddleware,
  deleteUserExpressionsController.handler,
);

export { userExpressionsRouter };
