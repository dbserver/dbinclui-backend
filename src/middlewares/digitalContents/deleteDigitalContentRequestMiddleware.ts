import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { clientErrorResponse } from "../../responses/appResponses.js";

export const deleteContentRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  next();
};
