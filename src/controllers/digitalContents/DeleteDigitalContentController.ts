import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DeleteDigitalContentService } from "../../services/digitalContents/DeleteDigitalContentService.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";

class DeleteDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new DeleteDigitalContentService(contentRepository);

      const result = await contentService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      // <--- Remove content from the database (Cloudinary) --->
      deleteContentCloudinary(result.filePaths);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteDigitalContentController = new DeleteDigitalContentController();
