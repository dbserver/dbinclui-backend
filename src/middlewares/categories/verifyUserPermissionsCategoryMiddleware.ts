import { NextFunction, Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { clientErrorResponse, serverErrorResponse } from "../../responses/appResponses.js";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";

export const verifyUserPermissionsCategoryMiddleware = async (
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

    const categoryRepository = new CategoryMongoRepository();
    const categoryResult = await categoryRepository.findById(req.params["id"]);

    if (!categoryResult) {
      return clientErrorResponse(res, new Error("Category with this id does not exists"));
    }

    const isAdmin = userResult.admin;
    const isOwner = userResult.uid === categoryResult?.author.uid;

    if (isOwner === false && isAdmin === false) {
      return clientErrorResponse(
        res,
        new Error("You don't have permissions to delete this category"),
      );
    }

    req.currentUser = userResult;

    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
