import { Router } from "express";
import { guideUploadCloudinary } from "../../configs/multer/cloudinary/guideMulterCloudinaryStorageConfig.js";
import { uploadCloudinary } from "../../configs/multer/cloudinary/multerCloudinaryStorageConfig.js";
import { guideUploadLocal } from "../../configs/multer/local/guideMulterCloudinaryStorageConfig.js";
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

const guidesRouter = Router();
const uploadFile =
  process.env.HOST_UPLOAD === "local"
    ? guideUploadLocal.single("file")
    : guideUploadCloudinary.single("file");

guidesRouter.post(
  "/",
  uploadFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no no body da requisição.
  guideRequestValidator("post"),
  createGuideRequestMiddleware,
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
  uploadFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no no body da requisição.
  guideRequestValidator("put"),
  updateGuideRequestMiddleware,
  updateGuideController.handler,
);

guidesRouter.delete(
  "/:id",
  guideRequestValidator("delete"),
  deleteGuideRequestMiddleware,
  deleteGuideController.handler,
);

export { guidesRouter };
