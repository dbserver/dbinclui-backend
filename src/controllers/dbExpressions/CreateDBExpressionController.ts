import { Request, Response } from "express";
import { DBExpressionsMongoRepository } from "../../repositories/mongoRepositories/DBExpressionsMongoRepository";
import { CreateDBExpressionService } from "../../services/dbExpressions/CreateDBExpressionService";
import { sucessfulResponse, serverErrorResponse, clientErrorResponse } from "../../responses/appResponses";
import { UserEntity } from "../../entities/UserEntity";

class CreateDBExpressionController {
    async handler(req: Request, res: Response) {
        try {
            const expression = req.body.expression;
            const author = req.body.user as UserEntity;

            const dbExpressionsRepository = new DBExpressionsMongoRepository();
            const dbExpressionService = new CreateDBExpressionService(dbExpressionsRepository);

            const result = await dbExpressionService.execute({ expression, author });

            if (result instanceof Error) {
                return clientErrorResponse(res, result);
            }

            return sucessfulResponse(res, { data: result });
        } catch (error) {
            return serverErrorResponse(res, error as Error);
        }
    }
}

export const createDBExpressionController = new CreateDBExpressionController();