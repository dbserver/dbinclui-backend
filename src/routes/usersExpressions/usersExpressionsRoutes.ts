import { Router } from "express";
import { createUserExpressionController } from "../../controllers/usersExpressions/CreateUserExpressionController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";

const userExpressionsRouter = Router();

userExpressionsRouter.post("/", validateTokenAccessMiddleware, verifyUserExistsMiddleware, createUserExpressionController.handler );

export { userExpressionsRouter };
