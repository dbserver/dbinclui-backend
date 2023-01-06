import { Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository.js";
import { DeleteDBExpressionService } from "../../services/dbExpressions/DeleteDBExpressionService.js";
import { clientErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";

class DeleteDBExpressionController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const dbExpressionsRepository = new DBExpressionsMongoRepository();
      const dbExpressionsService = new DeleteDBExpressionService(dbExpressionsRepository);

      const result = await dbExpressionsService.execute(id);

      return sucessfulResponse(res, result);
    } catch (error) {
      return clientErrorResponse(res, error as Error);
    }
  }
}

export const deleteDBExpressionController = new DeleteDBExpressionController();
