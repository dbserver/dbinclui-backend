import { NextFunction, Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { clientErrorResponse, serverErrorResponse } from "../../responses/appResponses.js";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository.js";

export const verifyUserExpressionsPermissionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const repository = new UserMongoRepository();
    const userResult = await repository.findByUid(req.body.decoded.uid);
    
    if (!userResult) {
      return clientErrorResponse(res, new Error("User with this uid does not exists."));
    }

    const id = req.params["id"];
    const userExpressionsRepository = new UsersExpressionsMongoRepository();
    const resultExpression = await userExpressionsRepository.findById(id);

    if (!resultExpression) {
      return clientErrorResponse(res, new Error("Expression with this id does not exists."));
    }
    const isOwner = userResult?.uid === resultExpression.author.uid;
  
    if (!isOwner) {
      return clientErrorResponse(
        res,
        new Error("You don't have permission to access this expression."),
      );
    }

    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
