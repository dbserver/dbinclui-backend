import { Router } from "express";
import { createUserController } from "../../controllers/users/CreateUserController.js";
import { verifyUserByUidController } from "../../controllers/users/VerifyUserByUidController.js";
import { authMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";

const usersRouter = Router();

usersRouter.get("/verify", authMiddleware, verifyUserByUidController.handler);
usersRouter.post("/", authMiddleware, createUserController.handler);

export { usersRouter };
