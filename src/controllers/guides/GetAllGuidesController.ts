import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetAllGuidesService } from "../../services/guides/GetAllGuidesService.js";

class GetAllGuidesController {
  async handler(req: Request, res: Response) {
    try {
      const guideRepository = new GuideMongoRepository();
      const guideService = new GetAllGuidesService(guideRepository);

      const result = await guideService.execute();

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllGuidesController = new GetAllGuidesController();
