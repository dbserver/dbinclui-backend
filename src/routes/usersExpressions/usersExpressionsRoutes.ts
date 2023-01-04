import { Router } from "express";
import { createUserExpressionController } from "../../controllers/usersExpressions/CreateUserExpressionController.js";
import { getAllByIdUserExpressionsController } from "../../controllers/usersExpressions/GetAllByIdUserExpressionsController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";
import { deleteUserExpressionsController } from "../../controllers/usersExpressions/DeleteUserExpressionsController.js";
import { verifyUserExpressionsPermissionsMiddleware } from "../../middlewares/usersExpressions/verifyUserPermissionMiddleware.js";
import { favoriteUserExpressionController } from "../../controllers/usersExpressions/FavoriteUserExpressionController.js";

const userExpressionsRouter = Router();

userExpressionsRouter.post(
  "/",
  validateTokenAccessMiddleware,
  verifyUserExistsMiddleware,
  createUserExpressionController.handler,
);

userExpressionsRouter.patch(
  "/favorite/:id",
  validateTokenAccessMiddleware,
  verifyUserExpressionsPermissionsMiddleware,
  favoriteUserExpressionController.handler,
);

userExpressionsRouter.get(
  "/",
  validateTokenAccessMiddleware,
  verifyUserExistsMiddleware,
  getAllByIdUserExpressionsController.handler,
);

userExpressionsRouter.delete(
  "/:id",
  validateTokenAccessMiddleware,
  verifyUserExpressionsPermissionsMiddleware,
  deleteUserExpressionsController.handler,
);

export { userExpressionsRouter };
