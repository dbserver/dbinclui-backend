import { Request, Response } from "express";
import { UserEntity } from "../../entities/UserEntity.js";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { CreateUserExpressionService } from "../../services/usersExpressions/CreateUserExpressionService.js";

class CreateUserExpressionController {
  async handler(req: Request, res: Response) {
    try {
      const expression = req.body.expression;
      const author = req.body.user as UserEntity;

      const usersExpressionsRepository = new UsersExpressionsMongoRepository();
      const userExpressionService = new CreateUserExpressionService(usersExpressionsRepository);

      const result = await userExpressionService.execute({ expression, author });

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }
      return sucessfulResponse(res, result );
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createUserExpressionController = new CreateUserExpressionController();
