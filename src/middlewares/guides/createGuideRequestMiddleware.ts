import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";
import { FileRequest } from "../../interfaces/FileRequest.js";

export const createGuideRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return clientErrorResponse(res, new Error("Você precisa enviar uma imagem"));
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const fileRequest = req.file as FileRequest;
    const fileObj = {
      filePath: fileRequest.path,
      publicId: fileRequest.filename,
    };

    deleteContentCloudinary([fileObj]);
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  next();
};
