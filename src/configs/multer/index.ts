import { guideUploadCloudinary } from "./cloudinary/guideMulterCloudinaryStorageConfig.js";
import { uploadCloudinary } from "./cloudinary/multerCloudinaryStorageConfig.js";
import { guideUploadLocal } from "./local/guideMulterCloudinaryStorageConfig.js";
import { uploadLocal } from "./local/multerLocalStorageConfig.js";

export const uploadFile =
  process.env.HOST_UPLOAD === "local"
    ? uploadLocal.array("files")
    : uploadCloudinary.array("files");

export const uploadGuideFile =
  process.env.HOST_UPLOAD === "local"
    ? guideUploadLocal.single("file")
    : guideUploadCloudinary.single("file");
