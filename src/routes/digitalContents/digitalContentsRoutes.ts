import { Router } from "express";
import { uploadCloudinary } from "../../configs/multer/cloudinary/multerCloudinaryStorageConfig.js";
import { createDigitalContentController } from "../../controllers/digitalContents/CreateDigitalContentController.js";
import { createDigitalContentRequestMiddleware } from "../../middlewares/digitalContents/createDigitalContentRequestMiddleware.js";
import { digitalContentRequestValidator } from "../../middlewares/digitalContents/validators/digitalContentRequestValidator.js";
import { deleteContentRequestMiddleware } from "../../middlewares/digitalContents/deleteDigitalContentRequestMiddleware.js";
import { deleteDigitalContentController } from "../../controllers/digitalContents/DeleteDigitaContentController.js";
import { getAllDigitalContentsController } from "../../controllers/digitalContents/GetAllDigitalContentsController.js";
import { getByIdDigitalContentController } from "../../controllers/digitalContents/GetByIdDigitalContentController.js";
import { updateDigitalContentController } from "../../controllers/digitalContents/UpdateDigitalContentController.js";
import { updateDigitalContentMiddleware } from "../../middlewares/digitalContents/updateDigitalContentMiddleware.js";
import { getByCategoryIdDigitalContentController } from "../../controllers/digitalContents/GetByCategoryIdDigitalContentController.js";
import { getByCategoryIdDigitalContentRequestMiddleware } from "../../middlewares/digitalContents/getByCategoryIdDigitalContentRequestMiddleware.js";
import { bodyRequestMiddleware } from "../../middlewares/bodyRequestMiddleware.js";
import { uploadLocal } from "../../configs/multer/local/multerLocalStorageConfig.js";

const digitalContentsRouter = Router();
const uploadFile =
  process.env.HOST_UPLOAD === "local"
    ? uploadLocal.array("files")
    : uploadCloudinary.array("files");

digitalContentsRouter.post(
  "/",
  uploadFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no no body da requisição.
  digitalContentRequestValidator("post"),
  createDigitalContentRequestMiddleware,
  createDigitalContentController.handler,
);

digitalContentsRouter.get(
  "/:id",
  digitalContentRequestValidator("get"),
  deleteContentRequestMiddleware,
  getByIdDigitalContentController.handler,
);

digitalContentsRouter.get("/", getAllDigitalContentsController.handler);

digitalContentsRouter.put(
  "/:id",
  uploadFile,
  bodyRequestMiddleware, // <- Este middleware serve para capturar o conteúdo da variável "data" enviado do formdata e inserir no no body da requisição.
  digitalContentRequestValidator("put"),
  updateDigitalContentMiddleware,
  updateDigitalContentController.handler,
);

digitalContentsRouter.get(
  "/category/:id",
  getByCategoryIdDigitalContentRequestMiddleware,
  digitalContentRequestValidator("get"),
  getByCategoryIdDigitalContentController.handler,
);

digitalContentsRouter.delete(
  "/:id",
  digitalContentRequestValidator("delete"),
  deleteContentRequestMiddleware,
  deleteDigitalContentController.handler,
);

export { digitalContentsRouter };
