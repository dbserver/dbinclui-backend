import { Request, Response } from "express";
import { FileRequest } from "../../interfaces/FileRequest.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateGuideService } from "../../services/guides/UpdateGuideService.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";
import { RequestFileProps } from "../interfaces/RequestProps.js";
import { GuideEntity } from "../../entities/GuideEntity.js";

class UpdateGuideController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;
      const reqFile = req.file as RequestFileProps;

      let fileObj;
      if (reqFile) {
        fileObj = {
          filePath: reqFile.path,
          publicId: reqFile.filename,
        };
      }

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

      // <--- Remove content from the database (Cloudinary) --->
      deleteContentCloudinary(result.oldFile);

      return sucessfulResponse(res, { data: result.guideUpdated });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateGuideController = new UpdateGuideController();
