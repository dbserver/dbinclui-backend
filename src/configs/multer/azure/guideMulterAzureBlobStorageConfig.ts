import multer from "multer";

import { azureStorage } from "../../../database/AzureBlobStorage.js";

const storage = azureStorage;
const multerAzureBlobStorageConfig: multer.Options = {
  fileFilter: (_, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
};

export const guideUploadAzureBlobStorage = multer(multerAzureBlobStorageConfig);
