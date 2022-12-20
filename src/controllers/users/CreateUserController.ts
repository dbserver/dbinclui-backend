import { Request, Response } from "express";
import { UserEntity } from "../../entities/UserEntity";
import { UserMongoRepository } from "../../repositories/mongoRepositories/UserMongoRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  async handler(req: Request, res: Response) {
    try {
      const body = req.body.decoded as UserEntity;

      const result = await this.service.execute(body);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

const userRepository = new UserMongoRepository()

const userService = new CreateUserService(userRepository)

export const createUserController = new CreateUserController(userService)