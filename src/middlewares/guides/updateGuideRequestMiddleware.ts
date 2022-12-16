import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { FileRequest } from "../../interfaces/FileRequest.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";

export const updateGuideRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fileRequest = req.file as FileRequest;
    const fileObj = {
      filePath: fileRequest.path,
      publicId: fileRequest.filename,
    };

    deleteContentCloudinary([fileObj]);
    const errorsMessage = errors.array();
    return clientErrorResponse(res, errorsMessage);
  }

  next();
};
