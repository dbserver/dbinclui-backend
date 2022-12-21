import { NextFunction, Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { clientErrorResponse, serverErrorResponse } from "../../responses/appResponses.js";

export const verifyUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const repository = new UserMongoRepository();
    const result = await repository.findByUid(req.body.decoded.uid);

    if (!result) {
      return clientErrorResponse(res, new Error("O usuário com este uid não existe."));
    }

  
    req.body.user = result;

    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
