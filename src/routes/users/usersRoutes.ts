import { Router } from "express";
import { createUserController } from "../../controllers/users/CreateUserController.js";
import { verifyUserByUidController } from "../../controllers/users/VerifyUserByUidController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";
import { getByUidController } from "../../controllers/users/GetByUidUserController.js";

const usersRouter = Router();

usersRouter.get("/verify", validateTokenAccessMiddleware, verifyUserByUidController.handler);
usersRouter.post("/", validateTokenAccessMiddleware, createUserController.handler);
usersRouter.get("/", validateTokenAccessMiddleware, getByUidController.handler);

export { usersRouter };
