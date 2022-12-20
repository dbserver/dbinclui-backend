import { Router } from "express";
import { createUserController } from "../../controllers/users/CreateUserController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";

const usersRouter = Router();

usersRouter.post("/", validateTokenAccessMiddleware, createUserController.handler);

export { usersRouter };
