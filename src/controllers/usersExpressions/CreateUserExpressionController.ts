import { Request, Response } from "express";
import { UsersExpressionsMongoRepository } from "../../repositories/mongoRepositories/UsersExpressionsMongoRepository";
import { CreateUserExpressionService } from "../../services/usersExpressions/CreateUserExpressionService";
import { sucessfulResponse, serverErrorResponse  } from "../../responses/appResponses";

class CreateUserExpressionController {
   async handler(req: Request, res: Response)  {
    try {
        const body = req.body;
        
        const usersExpressionsRepository = new UsersExpressionsMongoRepository()
        const userExpressionService = new CreateUserExpressionService(usersExpressionsRepository)
        
        const result = await userExpressionService.execute({...body})
        return sucessfulResponse(res, { data: result });
    
    } catch (error) {
        return serverErrorResponse(res, error as Error);   
    }
   }
}

export const createUserExpressionController = new CreateUserExpressionController();