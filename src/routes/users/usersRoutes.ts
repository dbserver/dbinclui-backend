import { Router } from "express";
import { createUserController } from "../../controllers/users/CreateUserController.js";
import { getByUidController } from "../../controllers/users/GetByUidUserController.js";
import { verifyUserByUidController } from "../../controllers/users/VerifyUserByUidController.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/verify", authMiddleware, verifyUserByUidController.handler);
usersRouter.post("/", authMiddleware, createUserController.handler);
usersRouter.get("/", authMiddleware, getByUidController.handler);


export { usersRouter };
