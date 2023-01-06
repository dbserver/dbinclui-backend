import { Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DeleteLogicDBExpressionService } from "../../services/dbExpressions/DeleteLogicDBExpressionService.js";

class DeleteLogicDBExpressionController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const dbExpressionsRepository = new DBExpressionsMongoRepository();
      const dbExpressionsService = new DeleteLogicDBExpressionService(dbExpressionsRepository);

      if (!req.currentUser._id) {
        return clientErrorResponse(res, "User ID not found");
      }

      const result = await dbExpressionsService.execute(id, req.currentUser._id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteLogicDBExpressionController = new DeleteLogicDBExpressionController();
