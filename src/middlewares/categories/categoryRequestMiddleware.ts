import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";

export const categoryRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  const { guide } = req.body;

  if (req.method === "POST" || (req.method === "PUT" && guide)) {
    const guideRepository = new GuideMongoRepository();
    const guideService = new GetByIdGuideService(guideRepository);

    const result = await guideService.execute(guide);
    if (result instanceof Error) {
      return clientErrorResponse(res, result);
    }
  }

  next();
};
