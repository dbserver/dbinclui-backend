import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetByCategoryIdDigitalContentService } from "../../services/digitalContents/GetByCategoryIdDigitalContentService.js";

class GetByCategoryIdDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new GetByCategoryIdDigitalContentService(contentRepository);

      const result = await contentService.execute(id);

      sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getByCategoryIdDigitalContentController =
  new GetByCategoryIdDigitalContentController();
