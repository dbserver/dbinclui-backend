import { Request, Response } from "express";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { DeleteLogicDigitalContentService } from "../../services/digitalContents/DeleteLogicDigitalContentService.js";

class DeleteLogicDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const digitalContentRepository = new DigitalContentMongoRepository();
      const digitalContentService = new DeleteLogicDigitalContentService(digitalContentRepository);

      if (!req.currentUser._id) {
        return clientErrorResponse(res, "User ID not found");
      }

      const result = await digitalContentService.execute(id, req.currentUser._id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteLogicDigitalContentController = new DeleteLogicDigitalContentController();
