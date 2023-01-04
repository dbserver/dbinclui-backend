import { Request, Response } from "express";
import { FavoriteUserExpressionService } from "../../services/usersExpressions/FavoriteUserExpressionService.js";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";

class FavoriteUserExpressionController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const userExpressionRepository = new UsersExpressionsMongoRepository();
      const userExpressionService = new FavoriteUserExpressionService(userExpressionRepository);

      const result = await userExpressionService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const favoriteUserExpressionController = new FavoriteUserExpressionController();
