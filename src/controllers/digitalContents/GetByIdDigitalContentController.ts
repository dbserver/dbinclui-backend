import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { GetByIdDigitalContentService } from "../../services/digitalContents/GetByIdDigitalContentService.js";

class GetByIdDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new GetByIdDigitalContentService(contentRepository);

      const result = await contentService.execute(id);
      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getByIdDigitalContentController = new GetByIdDigitalContentController();
