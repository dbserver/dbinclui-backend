import { Router } from "express";
import { uploadGuideFile } from "../../configs/multer/index.js";
import { createGuideController } from "../../controllers/guides/CreateGuideController.js";
import { deleteGuideController } from "../../controllers/guides/DeleteGuideController.js";
import { getAllGuidesController } from "../../controllers/guides/GetAllGuidesController.js";
import { getByIdGuideController } from "../../controllers/guides/GetByIdGuideController.js";
import { getCategoriesAndContentController } from "../../controllers/guides/GetCategoriesAndContentController.js";
import { updateGuideController } from "../../controllers/guides/UpdateGuideController.js";
import { authMiddleware } from "../../middlewares/auth/authMiddleware.js";
import { bodyRequestMiddleware } from "../../middlewares/bodyRequestMiddleware.js";
import { createGuideRequestMiddleware } from "../../middlewares/guides/createGuideRequestMiddleware.js";
import { deleteGuideRequestMiddleware } from "../../middlewares/guides/deleteGuideRequestMiddleware.js";
import { guideRequestMiddleware } from "../../middlewares/guides/guideRequestMiddleware.js";
import { updateGuideRequestMiddleware } from "../../middlewares/guides/updateGuideRequestMiddleware.js";
import { guideRequestValidator } from "../../middlewares/guides/validators/guideRequestValidator.js";
import { uploadErrorMiddleware } from "../../middlewares/uploadErrorMiddleware.js";
import { verifyUserExistsMiddleware } from "../../middlewares/auth/verifyUserExistsMiddleware.js";
import { deleteLogicGuideController } from "../../controllers/guides/DeleteLogicGuideController.js";
import { verifyUserPermissionGuideMiddleware } from "../../middlewares/guides/verifyUserPermissionGuideMiddleware.js";
import { adminPermissionsMiddleware } from "../../middlewares/auth/adminPermissionsMiddleware.js";

const guidesRouter = Router();

guidesRouter.post(
  "/",
  authMiddleware,
  verifyUserExistsMiddleware,
  uploadGuideFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no body da requisição.
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
  authMiddleware,
  verifyUserExistsMiddleware,
  uploadGuideFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no body da requisição.
  guideRequestValidator("put"),
  updateGuideRequestMiddleware,
  updateGuideController.handler,
  uploadErrorMiddleware,
);

guidesRouter.patch(
  "/delete/:id",
  authMiddleware,
  guideRequestValidator("delete"),
  deleteGuideRequestMiddleware,
  verifyUserPermissionGuideMiddleware,
  deleteLogicGuideController.handler,
);

guidesRouter.delete(
  "/:id",
  authMiddleware,
  adminPermissionsMiddleware,
  guideRequestValidator("delete"),
  deleteGuideRequestMiddleware,
  deleteGuideController.handler,
);

export { guidesRouter };
