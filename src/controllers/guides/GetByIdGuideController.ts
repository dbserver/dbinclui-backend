import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";

class GetByIdGuideController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const guideRepository = new GuideMongoRepository();
      const guideService = new GetByIdGuideService(guideRepository);

      const result = await guideService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getByIdGuideController = new GetByIdGuideController();
