import { NextFunction, Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { clientErrorResponse, serverErrorResponse } from "../../responses/appResponses.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";

export const verifyUserPermissionDigitalContentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const repository = new UserMongoRepository();
    const userResult = await repository.findByUid(req.body.decoded.uid);

    if (!userResult) {
      return clientErrorResponse(res, new Error("User with this uid already exists."));
    }

    const digitalContentRepository = new DigitalContentMongoRepository();
    const digitalContentResult = await digitalContentRepository.findById(req.params["id"]);

    if (!digitalContentResult) {
      return clientErrorResponse(res, new Error("Digital Content with this id does not exists"));
    }

    const isAdmin = userResult.admin;
    const isOwner = userResult.uid === digitalContentResult?.author.uid;
  
    if (isOwner === false && isAdmin === false) {
      return clientErrorResponse(res, new Error("You don't have permissions to delete this digital content"));
    }

    req.currentUser = userResult;
    
    next();
  } catch (error) {
    return serverErrorResponse(res, error as Error);
  }
};
