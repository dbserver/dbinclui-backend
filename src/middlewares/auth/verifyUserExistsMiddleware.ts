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
    const user = await repository.findByUid(req.body.decoded.uid);

    if (!user) {
      return clientErrorResponse(res, new Error("User with this uid does not exists."));
    }

    req.currentUser = user;

    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
