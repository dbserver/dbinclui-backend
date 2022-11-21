import { NextFunction, Request, Response } from "express";
import { clientErrorResponse } from "../../responses/appResponses";

export const bodyRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(req.body.data);
  } catch (error) {
    return clientErrorResponse(res, error as Error);
  }

  next();
};
