import { Router } from "express";
import { createUserController } from "../../controllers/users/CreateUserController.js";
import { verifyUserByUidController } from "../../controllers/users/VerifyUserByUidController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";

const usersRouter = Router();

usersRouter.get("/verify", validateTokenAccessMiddleware, verifyUserByUidController.handler);
usersRouter.post("/", validateTokenAccessMiddleware, createUserController.handler);

export { usersRouter };
