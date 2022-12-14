import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { FileRequest } from "../../interfaces/FileRequest.js";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByIdCategoryService } from "../../services/categories/GetByIdCategoryService.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";

export const updateDigitalContentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filesRequest = (req.files as FileRequest[]) ?? [];

  let files = [];
  for (let file of filesRequest) {
    const obj = {
      filePath: file.path,
      publicId: file.filename,
    };

    files.push(obj);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    deleteContentCloudinary(files);
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  const { guide, category } = req.body;

  if (category) {
    const categoryRepository = new CategoryMongoRepository();
    const categoryService = new GetByIdCategoryService(categoryRepository);

    const result = await categoryService.execute(category);
    if (result instanceof Error) {
      deleteContentCloudinary(files);
      return clientErrorResponse(res, result);
    }
  }

  if (guide) {
    const guideRepository = new GuideMongoRepository();
    const guideService = new GetByIdGuideService(guideRepository);

    const result = await guideService.execute(guide);
    if (result instanceof Error) {
      deleteContentCloudinary(files);
      return clientErrorResponse(res, result);
    }
  }

  next();
};
