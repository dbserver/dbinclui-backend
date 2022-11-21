import { Request, Response } from "express";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { CreateCategoryService } from "../../services/categories/CreateCategoryService.js";

class CreateCategoryController {
  async handler(req: Request, res: Response) {
    try {
      const body = req.body;

      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new CreateCategoryService(categoryRepository);

      const result = await categoryService.execute(body);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createCategoryController = new CreateCategoryController();
