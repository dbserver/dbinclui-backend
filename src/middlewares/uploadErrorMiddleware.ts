import { NextFunction, Request, Response } from "express";
import { clientErrorResponse } from "../responses/appResponses.js";

export const uploadErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error) {
    return clientErrorResponse(res, error);
  }
};
