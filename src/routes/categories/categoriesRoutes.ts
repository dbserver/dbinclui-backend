import { Router } from "express";
import { createCategoryController } from "../../controllers/categories/CreateCategoryController.js";
import { deleteCategoryController } from "../../controllers/categories/DeleteCategoryController.js";
import { getAllCategoriesController } from "../../controllers/categories/GetAllCategoriesController.js";
import { getByGuideIdCategoryController } from "../../controllers/categories/GetByGuideIdCategoryController.js";
import { getByIdCategoryController } from "../../controllers/categories/GetByIdCategoryController.js";
import { updateCategoryController } from "../../controllers/categories/UpdateCategoryController.js";
import { validateTokenAccessMiddleware } from "../../middlewares/auth/validateTokenAccessMiddleware.js";
import { categoryRequestMiddleware } from "../../middlewares/categories/categoryRequestMiddleware.js";
import { deleteCategoryRequestMiddleware } from "../../middlewares/categories/deleteCategoryRequestMiddleware.js";
import { categoryRequestValidator } from "../../middlewares/categories/validators/categoryRequestValidator.js";

const categoriesRouter = Router();

categoriesRouter.post(
  "/",
  validateTokenAccessMiddleware,
  categoryRequestValidator("post"),
  categoryRequestMiddleware,
  createCategoryController.handler,
);

categoriesRouter.put(
  "/:id",
  validateTokenAccessMiddleware,
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

categoriesRouter.delete(
  "/:id",
  validateTokenAccessMiddleware,
  categoryRequestValidator("delete"),
  deleteCategoryRequestMiddleware,
  deleteCategoryController.handler,
);

export { categoriesRouter };
