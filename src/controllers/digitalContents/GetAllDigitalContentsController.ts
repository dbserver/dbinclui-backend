import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetAllDigitalContentsService } from "../../services/digitalContents/GetAllDigitalContentsService.js";

class GetAllDigitalContentsController {
  async handler(_: Request, res: Response) {
    try {
      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new GetAllDigitalContentsService(contentRepository);

      const result = await contentService.execute();

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllDigitalContentsController = new GetAllDigitalContentsController();
