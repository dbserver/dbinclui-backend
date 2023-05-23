import { guideUploadAzureBlobStorage } from "./azure/guideMulterAzureBlobStorageConfig.js";
import { uploadAzureBlobStorage } from "./azure/multerAzureStorageConfig.js";
import { guideUploadLocal } from "./local/guideMulterCloudinaryStorageConfig.js";
import { uploadLocal } from "./local/multerLocalStorageConfig.js";

export const uploadFile =
  process.env.HOST_UPLOAD === "local"
    ? uploadLocal.array("files")
    : uploadAzureBlobStorage.array("files");

export const uploadGuideFile =
  process.env.HOST_UPLOAD === "local"
    ? guideUploadLocal.single("file")
    : guideUploadAzureBlobStorage.single("file");
