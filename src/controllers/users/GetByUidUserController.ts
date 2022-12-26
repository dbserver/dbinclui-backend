import { Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { GetByUidService } from "../../services/users/GetByUidUserService.js";

class GetByUidController {
  async handler(req: Request, res: Response) {
    try {
      const uid = req.body.decoded.uid;
      const userRepository = new UserMongoRepository();
      const userService = new GetByUidService(userRepository);

      const result = await userService.execute(uid);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getByUidController = new GetByUidController();
