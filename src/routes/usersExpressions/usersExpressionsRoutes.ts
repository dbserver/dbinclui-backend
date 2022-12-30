import { Router } from "express";
import { createUserExpressionController } from "../../controllers/usersExpressions/CreateUserExpressionController.js";
import { getAllByIdUserExpressionsController } from "../../controllers/usersExpressions/GetAllByIdUserExpressionsController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";
import { verifyUserExistsMiddleware } from "../../middlewares/usersExpressions/verifyUserExistsMiddleware.js";

const userExpressionsRouter = Router();

userExpressionsRouter.post("/", validateTokenAccessMiddleware, verifyUserExistsMiddleware, createUserExpressionController.handler );
userExpressionsRouter.get("/", validateTokenAccessMiddleware, verifyUserExistsMiddleware, getAllByIdUserExpressionsController.handler );

export { userExpressionsRouter };
