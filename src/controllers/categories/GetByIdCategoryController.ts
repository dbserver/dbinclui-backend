import { Request, Response } from "express";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { GetByIdCategoryService } from "../../services/categories/GetByIdCategoryService.js";

class GetByIdCategoryController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new GetByIdCategoryService(categoryRepository);

      const result = await categoryService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}
export const getByIdCategoryController = new GetByIdCategoryController();
