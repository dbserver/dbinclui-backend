import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByIdCategoryService } from "../../services/categories/GetByIdCategoryService.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";

export const updateDigitalContentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  const { guide, category } = req.body;

  if (category) {
    const categoryRepository = new CategoryMongoRepository();
    const categoryService = new GetByIdCategoryService(categoryRepository);

    const result = await categoryService.execute(category);
    if (result instanceof Error) {
      return clientErrorResponse(res, result);
    }
  }

  if (guide) {
    const guideRepository = new GuideMongoRepository();
    const guideService = new GetByIdGuideService(guideRepository);

    const result = await guideService.execute(guide);
    if (result instanceof Error) {
      return clientErrorResponse(res, result);
    }
  }

  next();
};
