import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateDigitalContentService } from "../../services/digitalContents/UpdateDigitalContentService.js";
import { AzureBlobStorageResponse } from "../interfaces/RequestProps.js";
import { deleteFilesFromAzureBlobStorage } from "../../utils/deleteFileFromAzureBlobStorage.js";

class UpdateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;
      const reqFiles = (req.files as unknown as AzureBlobStorageResponse[]) ?? [];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new UpdateDigitalContentService(contentRepository);

      let files = [];
      for (let file of reqFiles) {
        const obj = {
          filePath: file.url,
          publicId: file.blobName,
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

      deleteFilesFromAzureBlobStorage(result.oldFiles);

      return sucessfulResponse(res, { data: result.contentUpdated });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateDigitalContentController = new UpdateDigitalContentController();
