import { Request, Response } from "express";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses";
import { GetAllByIdUserExpressionsService } from "../../services/usersExpressions/GetAllByIdUserExpressionsService";

class GetAllByIdUserExpressionsController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.body.user._id as string;

      const userExpressionsRepository = new UsersExpressionsMongoRepository();
      const userExpressionService = new GetAllByIdUserExpressionsService(userExpressionsRepository);

      const result = await userExpressionService.execute(id);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllByIdUserExpressionsController = new GetAllByIdUserExpressionsController();
