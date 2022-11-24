import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByIdCategoryService } from "../../services/categories/GetByIdCategoryService.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";
import { FileRequest } from "../../interfaces/FileRequest.js";

export const createDigitalContentRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.files?.length === 0) {
    return clientErrorResponse(
      res,
      new Error("Você precisa enviar alguma mídia (imagem ou vídeo)"),
    );
  }

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

  const guideRepository = new GuideMongoRepository();
  const guideService = new GetByIdGuideService(guideRepository);

  const resultGuide = await guideService.execute(guide);
  if (resultGuide instanceof Error) {
    deleteContentCloudinary(files);
    return clientErrorResponse(res, resultGuide);
  }

  const categoryRepository = new CategoryMongoRepository();
  const categoryService = new GetByIdCategoryService(categoryRepository);

  const resultCategory = await categoryService.execute(category);
  if (resultCategory instanceof Error) {
    deleteContentCloudinary(files);
    return clientErrorResponse(res, resultCategory);
  }

  next();
};
