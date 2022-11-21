import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateGuideService } from "../../services/guides/UpdateGuideService.js";

class UpdateGuideController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;

      const guideRepository = new GuideMongoRepository();
      const guideService = new UpdateGuideService(guideRepository);

      const result = await guideService.execute(id, body);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateGuideController = new UpdateGuideController();
