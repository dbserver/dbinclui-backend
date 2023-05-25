import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { FileRequest } from "../../interfaces/FileRequest.js";
import { AzureBlobStorageResponse } from "../../controllers/interfaces/RequestProps.js";
import { deleteFilesFromAzureBlobStorage } from "../../utils/deleteFileFromAzureBlobStorage.js";

export const createGuideRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return clientErrorResponse(res, new Error("Você precisa enviar uma imagem"));
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const fileRequest = req.file as unknown as AzureBlobStorageResponse;
    const fileObj = {
      filePath: fileRequest.url,
      publicId: fileRequest.blobName,
    };

    deleteFilesFromAzureBlobStorage([fileObj]);
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  next();
};
