import { Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetAllDBExpressionsService } from "../../services/dbExpressions/GetAllDBExpressionService.js";

class GetAllDBExpressionsController {
  async handler(_: Request, res: Response) {
    try {
      const dBExpressionsRepository = new DBExpressionsMongoRepository();
      const contentService = new GetAllDBExpressionsService(dBExpressionsRepository);

      const result = await contentService.execute();

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllDBExpressionsController = new GetAllDBExpressionsController();
