import { Request, Response } from "express";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DeleteUserExpressionsService } from "../../services/usersExpressions/DeleteUserExpressionsService.js";

class DeleteUserExpressionsController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const userExpressionsRepository = new UsersExpressionsMongoRepository();
      const userExpressionService = new DeleteUserExpressionsService(userExpressionsRepository);

      const result = await userExpressionService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}
export const deleteUserExpressionsController = new DeleteUserExpressionsController();
