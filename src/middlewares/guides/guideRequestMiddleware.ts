import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result.js";
import { clientErrorResponse } from "../../responses/appResponses.js";

export const guideRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  next();
};
