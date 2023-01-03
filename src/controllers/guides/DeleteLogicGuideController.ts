import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DeleteLogicGuideService } from "../../services/guides/DeleteLogicGuideService.js";

class DeleteLogicGuideController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const guideRepository = new GuideMongoRepository();
      const guideService = new DeleteLogicGuideService(guideRepository);

      if (!req.currentUser._id) {
        return clientErrorResponse(res, "User ID not found");
      }

      const result = await guideService.execute(id, req.currentUser._id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteLogicGuideController = new DeleteLogicGuideController();
