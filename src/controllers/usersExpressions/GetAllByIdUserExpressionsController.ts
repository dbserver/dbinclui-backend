import { Request, Response } from "express";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetAllByIdUserExpressionsService } from "../../services/usersExpressions/GetAllByIdUserExpressionsService.js";

class GetAllByIdUserExpressionsController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.currentUser._id as string;

      const userExpressionsRepository = new UsersExpressionsMongoRepository();
      const userExpressionService = new GetAllByIdUserExpressionsService(userExpressionsRepository);

      const result = await userExpressionService.execute(id);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllByIdUserExpressionsController = new GetAllByIdUserExpressionsController();
