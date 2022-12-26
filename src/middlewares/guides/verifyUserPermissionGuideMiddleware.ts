import { NextFunction, Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { clientErrorResponse, serverErrorResponse } from "../../responses/appResponses.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";

export const verifyUserPermissionGuideMiddleware = async (
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

    const guideRepository = new GuideMongoRepository();
    const guideResult = await guideRepository.findById(req.params["id"]);

    if (!guideResult) {
      return clientErrorResponse(res, new Error("Guide with this ID does not exists."));
    }

    const isAdmin = userResult.admin;
    const isOwner = userResult.uid === guideResult?.author.uid;

    if (isOwner === false && isAdmin === false) {
      return clientErrorResponse(res, new Error("You don't have permissions to delete this guide"));
    }

    req.currentUser = userResult;

    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
