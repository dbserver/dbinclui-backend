import { Request, Response } from "express";
import { UserEntity } from "../../entities/UserEntity";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { CreateUserService } from "../../services/users/CreateUserService.js";

class CreateUserController {
  constructor() {}

  async handler(req: Request, res: Response) {
    try {
      const body = req.body.decoded as UserEntity;

      const userRepository = new UserMongoRepository();
      const userService = new CreateUserService(userRepository);

      const result = await userService.execute(body);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createUserController = new CreateUserController();
