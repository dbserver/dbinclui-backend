import { Request, Response } from "express";
import { FileRequest } from "../../interfaces/FileRequest.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateGuideService } from "../../services/guides/UpdateGuideService.js";
import { deleteFilesFromAzureBlobStorage } from "../../utils/deleteFileFromAzureBlobStorage.js";
import { AzureBlobStorageResponse } from "../interfaces/RequestProps.js";
import { GuideEntity } from "../../entities/GuideEntity.js";

class UpdateGuideController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;

      const reqFile = req.file as unknown as AzureBlobStorageResponse;

      const fileObj = {
        filePath: reqFile.url,
        publicId: reqFile.blobName,
      };

      const guideRepository = new GuideMongoRepository();
      const guideService = new UpdateGuideService(guideRepository);

      const result = await guideService.execute(
        id,
        { ...body, updatedBy: req.currentUser._id },
        fileObj,
      );

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      deleteFilesFromAzureBlobStorage(result.oldFile);

      return sucessfulResponse(res, { data: result.guideUpdated });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateGuideController = new UpdateGuideController();
