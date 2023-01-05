import { Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { GetByIdDBExpressionService } from "../../services/dbExpressions/GetByIdDBExpressionService.js";

class GetByIdDBExpressionController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const dbExpressionRepository = new DBExpressionsMongoRepository();
      const dbExpressionService = new GetByIdDBExpressionService(dbExpressionRepository);

      const result = await dbExpressionService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}
export const getByIdDBExpressionController = new GetByIdDBExpressionController();
