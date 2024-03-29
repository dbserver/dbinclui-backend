import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { CreateDigitalContentService } from "../../services/digitalContents/CreateDigitalContentService.js";
import { AzureBlobStorageResponse } from "../interfaces/RequestProps.js";

class CreateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const body = req.body;
      const reqFiles = req.files as unknown as AzureBlobStorageResponse[];
      const userId = req.currentUser._id as any;

      const digitalContentRepository = new DigitalContentMongoRepository();
      const digitalContentService = new CreateDigitalContentService(digitalContentRepository);

      let files = [];
      for (let file of reqFiles) {
        const obj = {
          filePath: file.url,
          publicId: file.blobName,
        };

        files.push(obj);
      }

      const result = await digitalContentService.execute({
        title: body.title,
        shortDescription: body.shortDescription,
        guide: body.guide,
        category: body.category,
        author: userId,
        filePaths: files,
      });

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createDigitalContentController = new CreateDigitalContentController();
