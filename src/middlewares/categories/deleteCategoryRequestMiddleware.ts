import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByCategoryIdDigitalContentService } from "../../services/digitalContents/GetByCategoryIdDigitalContentService.js";

export const deleteCategoryRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  const id = req.params["id"];

  const contentRepository = new DigitalContentMongoRepository();
  const contentService = new GetByCategoryIdDigitalContentService(contentRepository);
  const contentResult = await contentService.execute(id);

  if (contentResult.length > 0) {
    return clientErrorResponse(
      res,
      new Error("Não é possível deletar uma categoria vinculada a conteúdos digitais"),
    );
  }

  next();
};
