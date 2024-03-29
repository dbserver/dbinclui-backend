import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { CreateGuideService } from "../../services/guides/CreateGuideService.js";
import { AzureBlobStorageResponse } from "../interfaces/RequestProps.js";

class CreateGuideController {
  async handler(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId = req.currentUser._id as any;
      const reqFile = req.file as unknown as AzureBlobStorageResponse;

      const fileObj = {
        filePath: reqFile.url,
        publicId: reqFile.blobName,
      };

      const guideRepository = new GuideMongoRepository();
      const guideService = new CreateGuideService(guideRepository);

      const result = await guideService.execute({
        title: body.title,
        content: body.content,
        filePaths: fileObj,
        author: userId,
      });

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createGuideController = new CreateGuideController();
