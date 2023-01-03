import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateDigitalContentService } from "../../services/digitalContents/UpdateDigitalContentService.js";
import { RequestFileProps } from "../interfaces/RequestProps.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";

class UpdateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;
      const reqFiles = (req.files as RequestFileProps[]) ?? [];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new UpdateDigitalContentService(contentRepository);

      let files = [];
      for (let file of reqFiles) {
        const obj = {
          filePath: file.path,
          publicId: file.filename,
        };

        files.push(obj);
      }

      const result = await contentService.execute(
        id,
        { ...body, updatedBy: req.currentUser._id },
        files,
      );

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      // <--- Remove content from the database (Cloudinary) --->
      deleteContentCloudinary(result.oldFiles);

      return sucessfulResponse(res, { data: result.contentUpdated });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateDigitalContentController = new UpdateDigitalContentController();
