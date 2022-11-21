import { Router } from "express";
import { createGuideController } from "../../controllers/guides/CreateGuideController.js";
import { deleteGuideController } from "../../controllers/guides/DeleteGuideController.js";
import { getAllGuidesController } from "../../controllers/guides/GetAllGuidesController.js";
import { getByIdGuideController } from "../../controllers/guides/GetByIdGuideController.js";
import { getCategoriesAndContentController } from "../../controllers/guides/GetCategoriesAndContentController.js";
import { updateGuideController } from "../../controllers/guides/UpdateGuideController.js";
import { deleteGuideRequestMiddleware } from "../../middlewares/guides/deleteGuideRequestMiddleware.js";
import { guideRequestMiddleware } from "../../middlewares/guides/guideRequestMiddleware.js";
import { guideRequestValidator } from "../../middlewares/guides/validators/guideRequestValidator.js";

const guidesRouter = Router();

guidesRouter.post(
  "/",
  guideRequestValidator("post"),
  guideRequestMiddleware,
  createGuideController.handler,
);

guidesRouter.get("/", getAllGuidesController.handler);

guidesRouter.get(
  "/:id",
  guideRequestValidator("get"),
  guideRequestMiddleware,
  getByIdGuideController.handler,
);

guidesRouter.get("/categoriesAndContent/:id", getCategoriesAndContentController.handler);

guidesRouter.put(
  "/:id",
  guideRequestValidator("put"),
  guideRequestMiddleware,
  updateGuideController.handler,
);

guidesRouter.delete(
  "/:id",
  guideRequestValidator("delete"),
  deleteGuideRequestMiddleware,
  deleteGuideController.handler,
);

export { guidesRouter };
