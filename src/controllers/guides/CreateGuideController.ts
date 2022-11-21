import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { CreateGuideService } from "../../services/guides/CreateGuideService.js";

class CreateGuideController {
  async handler(req: Request, res: Response) {
    try {
      const body = req.body;

      const guideRepository = new GuideMongoRepository();
      const guideService = new CreateGuideService(guideRepository);

      const result = await guideService.execute(body);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createGuideController = new CreateGuideController();
