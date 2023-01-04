import { NextFunction, Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository.js";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { clientErrorResponse, serverErrorResponse } from "../../responses/appResponses.js";

export const verifyDBExpressionsPermissionsMiddleware = async (
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
    const DBExpressionsRepository = new DBExpressionsMongoRepository();
    const resultExpression = await DBExpressionsRepository.findById(id);

    if (!resultExpression) {
      return clientErrorResponse(res, new Error("Expression with this id does not exists."));
    }

    const isAdm = userResult?.admin === true;
    const isOwner = userResult?.uid === resultExpression.author.uid;

    if (!isAdm && !isOwner) {
      return clientErrorResponse(
        res,
        new Error("You don't have permission to delete this expression."),
      );
    }

    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
