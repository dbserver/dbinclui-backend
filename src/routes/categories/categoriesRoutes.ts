import { Router } from "express";
import { createCategoryController } from "../../controllers/categories/CreateCategoryController.js";
import { deleteCategoryController } from "../../controllers/categories/DeleteCategoryController.js";
import { getAllCategoriesController } from "../../controllers/categories/GetAllCategoriesController.js";
import { getByGuideIdCategoryController } from "../../controllers/categories/GetByGuideIdCategoryController.js";
import { getByIdCategoryController } from "../../controllers/categories/GetByIdCategoryController.js";
import { updateCategoryController } from "../../controllers/categories/UpdateCategoryController.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";
import { categoryRequestMiddleware } from "../../middlewares/categories/categoryRequestMiddleware.js";
import { deleteCategoryRequestMiddleware } from "../../middlewares/categories/deleteCategoryRequestMiddleware.js";
import { categoryRequestValidator } from "../../middlewares/categories/validators/categoryRequestValidator.js";
import { verifyUserExistsMiddleware } from "../../middlewares/auth/verifyUserExistsMiddleware.js";
import { verifyUserPermissionsCategoryMiddleware } from "../../middlewares/categories/verifyUserPermissionsCategoryMiddleware.js";
import { deleteLogicCategoryController } from "../../controllers/categories/DeleteLogicCategoryController.js";
import { adminPermissionsMiddleware } from "../../middlewares/auth/adminPermissionsMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.post(
  "/",
  authMiddleware,
  verifyUserExistsMiddleware,
  categoryRequestValidator("post"),
  categoryRequestMiddleware,
  createCategoryController.handler,
);

categoriesRouter.put(
  "/:id",
  authMiddleware,
  verifyUserExistsMiddleware,
  categoryRequestValidator("put"),
  categoryRequestMiddleware,
  updateCategoryController.handler,
);

categoriesRouter.get("/", getAllCategoriesController.handler);

categoriesRouter.get(
  "/:id",
  categoryRequestValidator("get"),
  categoryRequestMiddleware,
  getByIdCategoryController.handler,
);

categoriesRouter.get(
  "/guide/:id",
  categoryRequestValidator("get"),
  categoryRequestMiddleware,
  getByGuideIdCategoryController.handler,
);

categoriesRouter.patch(
  "/delete/:id",
  authMiddleware,
  categoryRequestValidator("delete"),
  deleteCategoryRequestMiddleware,
  verifyUserPermissionsCategoryMiddleware,
  deleteLogicCategoryController.handler,
);

categoriesRouter.delete(
  "/:id",
  authMiddleware,
  adminPermissionsMiddleware,
  categoryRequestValidator("delete"),
  deleteCategoryRequestMiddleware,
  deleteCategoryController.handler,
);

export { categoriesRouter };
