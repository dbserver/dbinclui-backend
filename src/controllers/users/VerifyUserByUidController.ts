import { Request, Response } from "express";
import { UserEntity } from "../../entities/UserEntity.js";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { VerifyUserByUidService } from "../../services/users/VerifyUserByUidService.js";

class VerifyUserByUidController {
  constructor() {}

  async handler(req: Request, res: Response) {
    try {
      const body = req.body.decoded as UserEntity;

      const userRepository = new UserMongoRepository();
      const userService = new VerifyUserByUidService(userRepository);

      const result = await userService.execute(body);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const verifyUserByUidController = new VerifyUserByUidController();
