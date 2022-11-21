import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";

export const deleteGuideRequestMiddleware = async (
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

  const categoryRepository = new CategoryMongoRepository();
  const categoryResult = await categoryRepository.findByGuideId(id);

  const contentRepository = new DigitalContentMongoRepository();
  const contentResult = await contentRepository.findByGuideId(id);

  if (categoryResult.length > 0 || contentResult.length > 0) {
    return clientErrorResponse(
      res,
      new Error("Não é possível deletar um guia com categorias ou conteudos digitais vinculados"),
    );
  }

  next();
};
