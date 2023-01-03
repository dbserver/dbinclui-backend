import { Router } from "express";
import { createUserExpressionController } from "../../controllers/usersExpressions/CreateUserExpressionController.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";

const userExpressionsRouter = Router();

userExpressionsRouter.post("/", authMiddleware, verifyUserExistsMiddleware, createUserExpressionController.handler );

export { userExpressionsRouter };
