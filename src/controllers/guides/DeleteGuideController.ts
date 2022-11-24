import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DeleteGuideService } from "../../services/guides/DeleteGuideService.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";

class DeleteGuideController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const guideRepository = new GuideMongoRepository();
      const guideService = new DeleteGuideService(guideRepository);

      const result = await guideService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      // <--- Remove content from the database (Cloudinary) --->
      deleteContentCloudinary([result.filePaths]);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteGuideController = new DeleteGuideController();
