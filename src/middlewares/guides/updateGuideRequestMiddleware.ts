import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { clientErrorResponse } from "../../responses/appResponses.js";

export const updateGuideRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessage = errors.array();
    return clientErrorResponse(res, errorsMessage);
  }

  next();
};
