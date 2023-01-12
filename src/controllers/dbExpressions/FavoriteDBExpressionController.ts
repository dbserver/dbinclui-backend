import { Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository.js";
import { FavoriteDBExpressionService } from "../../services/dbExpressions/FavoriteDBExpressionService.js";
import { sucessfulResponse, serverErrorResponse } from "../../responses/appResponses.js";

class FavoriteDBExpressionController {
  async handler(req: Request, res: Response) {
    try {
      const expressionID = req.params["id"];
      const userID = req.currentUser._id as string;

      const dbExpressionRepository = new DBExpressionsMongoRepository();
      const dbExpressionService = new FavoriteDBExpressionService(dbExpressionRepository);

      const result = await dbExpressionService.execute(expressionID, userID);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const favoriteDBExpressionController = new FavoriteDBExpressionController();
