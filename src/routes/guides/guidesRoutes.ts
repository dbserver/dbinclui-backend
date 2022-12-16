import { Router } from "express";
import { uploadGuideFile } from "../../configs/multer/index.js";
import { createGuideController } from "../../controllers/guides/CreateGuideController.js";
import { deleteGuideController } from "../../controllers/guides/DeleteGuideController.js";
import { getAllGuidesController } from "../../controllers/guides/GetAllGuidesController.js";
import { getByIdGuideController } from "../../controllers/guides/GetByIdGuideController.js";
import { getCategoriesAndContentController } from "../../controllers/guides/GetCategoriesAndContentController.js";
import { updateGuideController } from "../../controllers/guides/UpdateGuideController.js";
import { bodyRequestMiddleware } from "../../middlewares/bodyRequestMiddleware.js";
import { createGuideRequestMiddleware } from "../../middlewares/guides/createGuideRequestMiddleware.js";
import { deleteGuideRequestMiddleware } from "../../middlewares/guides/deleteGuideRequestMiddleware.js";
import { guideRequestMiddleware } from "../../middlewares/guides/guideRequestMiddleware.js";
import { updateGuideRequestMiddleware } from "../../middlewares/guides/updateGuideRequestMiddleware.js";
import { guideRequestValidator } from "../../middlewares/guides/validators/guideRequestValidator.js";
import { uploadErrorMiddleware } from "../../middlewares/uploadErrorMiddleware.js";

const guidesRouter = Router();

guidesRouter.post(
  "/",
  uploadGuideFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no no body da requisição.
  guideRequestValidator("post"),
  createGuideRequestMiddleware,
  createGuideController.handler,
  uploadErrorMiddleware,
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
  uploadGuideFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no no body da requisição.
  guideRequestValidator("put"),
  updateGuideRequestMiddleware,
  updateGuideController.handler,
  uploadErrorMiddleware,
);

guidesRouter.delete(
  "/:id",
  guideRequestValidator("delete"),
  deleteGuideRequestMiddleware,
  deleteGuideController.handler,
);

export { guidesRouter };
